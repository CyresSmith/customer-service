import Button from 'components/Ui/Buttons/Button';
import { Form, FormInputsList } from 'components/Ui/Form/CustomForm.styled';
import CustomFormInput from 'components/Ui/Form/CustomFormInput';
import { getErrorMessage } from 'helpers/inputsValidation';
import { useForm } from 'hooks';
import { useCompany } from 'hooks/useCompany';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiArrowLeft, HiSearch, HiX } from 'react-icons/hi';
import { useFindUserDataMutation } from 'services/company.api';

import Loader from 'components/Ui/Loader';
import handleError from 'helpers/errorHandler';
import { translateLabels } from 'helpers/translateLabels';
import { UserData } from 'store/user/user.types';
import {
  Info,
  InfoBlock,
  InputWrapper,
  SearchMessage,
  Title,
  UserDataBox,
  UserImg,
  UserInfo,
  UserInfoBox,
} from './FindUserForm.styled';

type Props = {
  existUser: UserData | null;
  setExistUser: Dispatch<SetStateAction<UserData | null>>;
  handleBackClick: () => void;
};

const inputs = [
  {
    name: 'email',
    type: 'email',
    isRequired: true,
  },
];

const initialState = {
  email: '',
};

enum MessageEnum {
  FIND = 'Знайдіть користувача по е-пошті',
  ERROR = 'Аккаунт не знайдено',
}

const FindUserForm = ({ existUser, setExistUser, handleBackClick }: Props) => {
  const { id } = useCompany();
  const [findUserData, { isLoading, isError, error }] =
    useFindUserDataMutation();
  const [message, setMessage] = useState<MessageEnum | string>(
    MessageEnum.FIND
  );

  const onSubmit = async (state: State) => {
    if (state.email) {
      const data = await findUserData({
        id,
        email: state.email,
      }).unwrap();

      if (data) {
        setExistUser(data);
      }
    }
  };

  const { state, setState, handleChange, handleSubmit, invalidFields, reset } =
    useForm<typeof initialState>(initialState, onSubmit);

  const handleClick = () => {
    reset();
    setMessage(MessageEnum.FIND);
    setExistUser(null);
  };

  useEffect(() => {
    if (isError && error) {
      setMessage(handleError(error));
    }
  }, [error, isError]);

  useEffect(() => {
    if (state.email === '' || invalidFields.length > 0) {
      setExistUser(null);
      setMessage(MessageEnum.FIND);
    }
  }, [invalidFields.length, setExistUser, state.email]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormInputsList>
          {inputs.map(
            ({ name, type, isRequired = false }, i) =>
              type !== 'checkbox' && (
                <InputWrapper key={i}>
                  <CustomFormInput
                    type={type}
                    name={name}
                    value={state[name as keyof typeof initialState]}
                    handleChange={handleChange}
                    isValid={getErrorMessage(name, invalidFields)}
                    isRequired={isRequired}
                  />

                  {(existUser || message !== MessageEnum.FIND) && (
                    <Button
                      id="search"
                      Icon={HiX}
                      $variant="text"
                      size="l"
                      $round
                      $colors="danger"
                      onClick={handleClick}
                    />
                  )}

                  {!existUser && message === MessageEnum.FIND && (
                    <Button
                      disabled={
                        isLoading ||
                        state.email === '' ||
                        invalidFields.length > 0
                      }
                      isLoading={isLoading}
                      id="search"
                      Icon={HiSearch}
                      type="submit"
                      $variant="text"
                      size="l"
                      $round
                      $colors="accent"
                    />
                  )}
                </InputWrapper>
              )
          )}
        </FormInputsList>
      </Form>

      <UserDataBox>
        {isLoading ? (
          <Loader />
        ) : existUser ? (
          <UserInfoBox>
            {existUser.avatar !== '' && (
              <UserImg>
                <img src={existUser.avatar} />
              </UserImg>
            )}
            <UserInfo>
              {Object.entries(existUser)
                .filter(([title]) => !['avatar', 'id', 'email'].includes(title))
                .map(([title, info]) => {
                  return (
                    <InfoBlock key={title}>
                      <Title>{translateLabels(title)}:</Title>{' '}
                      <Info>{info}</Info>
                    </InfoBlock>
                  );
                })}
            </UserInfo>
          </UserInfoBox>
        ) : (
          <SearchMessage>{message}</SearchMessage>
        )}
      </UserDataBox>

      {!existUser && (
        <Button
          id="back"
          Icon={HiArrowLeft}
          type="submit"
          $colors="light"
          onClick={handleBackClick}
        >
          Назад
        </Button>
      )}
    </>
  );
};

export default FindUserForm;

import { ServiceBasicInfo } from 'services/types/service.type';

export const calculateEventDuration = (services: ServiceBasicInfo[]): number => {
    let duration: number = 0;

    services.forEach(service => {
        if (service.duration) {
            duration += service.duration;
        }
    });

    return duration;
};

import { Toast } from 'vant'; 
type LoadingType = 'circular' | 'spinner';

interface loadingParams {
    message?: string,
    forbidClick?: boolean,
    duration?: number,
    loadingType?: LoadingType
}

export const UILoading = (params: loadingParams = {}) => {
    const {
        message = '加载中...',
        forbidClick = true,
        duration = 0,
        loadingType = 'spinner'
    } = params;
    Toast.loading({
        message,
        forbidClick,
        duration,
        loadingType
    })
}

export const UILoaded = (timeout: number) => {
    return setTimeout(() => Toast.clear(), timeout)
}
import service from "@/utils/request";

export async function getAircraftAllOptions() {
    try {
        return await service.request({
            url: '/test_app/visual_data/aircraft_options',
            method: 'get',
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getMissileAllOptions() {
    try {
        return await service.request({
            url: '/test_app/visual_data/aircraft_data',
            method: 'get',
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getAircraftDataOne(formData) {
    try {
        return await service.request({
            url: '/test_app/visual_data/aircraft_data',
            method: 'post',
            data: {
                emulation: formData.emulation,
                round: formData.round,
                drawItem: formData.drawItem
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getMissileData(formData) {
    try {
        return await service.request({
            url: '',
            method: 'post',
            data: {
                emulation: formData.emulation,
                round: formData.round,
                team: formData.team,
                missileCode: formData.missileCode,
                drawItem: formData.drawItem
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getStatisticsData() {
    try {
        return await service.request({
            url: '',
            method: 'get'
        });
    } catch (error) {
        console.log(error);
    }
}

export async function uploadImg(formData) {
    try {
        return await service.request({
            url: '/test_app/visual_data/upload_img',
            method: 'post',
            data: formData
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getImg() {
    try {
        return await service.request({
            url: '/test_app/visual_data/get_img',
            method: 'get'
        });
    } catch (error) {
        console.log(error);
    }
}

export async function uploadVideo(formData) {
    try {
        return await service.request({
            url: '/test_app/visual_data/upload_video',
            method: 'post',
            data: formData
        });
    } catch (error) {
        console.log(error);
    }
}

export async function getVideo() {
    try {
        return await service.request({
            url: '/test_app/visual_data/get_video',
            method: 'get'
        });
    } catch (error) {
        console.log(error);
    }
}


// export async function getStatisticsData() {
//     // 随机生成50个100以内的正整数
//     let redTeamWinRateData = []
//     let blueTeamWinRateData = []
//     // 随机生成50个100以内的正整数
//     for (let i = 0; i < 50; i++) {
//         let num = Math.floor(Math.random() * 100)
//         redTeamWinRateData.push(num)
//         blueTeamWinRateData.push(100 - num)
//     }
//     // 生成50个轮次
//     let roundData = []
//     for (let i = 0; i < 50; i++) {
//         roundData.push(i + 1)
//     }
//
//     const response = {
//         data: {
//             redTeamWinRateData: redTeamWinRateData,
//             blueTeamWinRateData: blueTeamWinRateData,
//             roundData: roundData
//         },
//         status: 200,
//         statusText: 'OK',
//         headers: {},
//         config: {}
//     };
//
//     return response;
// }


// interface AircraftFormDataType {
//     // 仿真
//     emulation: number
//     // 轮次
//     round: number
//     // 绘制项目
//     drawItem: number
// }
//
// // 获取飞机数据
// export function getAircraftData(formData: AircraftFormDataType) {
//     return request({
//         url: '',
//         method: 'post',
//         data: {
//             emulation: formData.emulation,
//             round: formData.round,
//             drawItem: formData.drawItem
//         }
//     })
// }
//
// interface MissileFormDataType {
//     // 仿真
//     emulation: number
//     // 轮次
//     round: number
//     // 队伍
//     team: number
//     // 导弹编号
//     missileCode: string
//     // 绘制项目
//     drawItem: number
// }
//
// // 获取导弹数据
// export function getMissileData(formData: MissileFormDataType) {
//     return request({
//         url: '',
//         method: 'post',
//         data: {
//             emulation: formData.emulation,
//             round: formData.round,
//             team: formData.team,
//             missileCode: formData.missileCode,
//             drawItem: formData.drawItem
//         }
//     })
// }
//
// // 获取统计数据
// export function getStatisticsData() {
//     return request({
//         url: '',
//         method: 'get'
//     })
// }
import { randomUUID } from 'crypto'
import { Redis } from 'ioredis'
import { IItem, SortedItemRepository, } from 'item-store-redis'

// export const redis = createClient({
//     password: 'ocFM2CRIpviGiuFgchOM5I8xeR808Mq1',
//     socket: {
//         host: 'redis-18216.c240.us-east-1-3.ec2.redns.redis-cloud.com',
//         port: 18216
//     }
// })

// export const redis = new Redis({
//     password: 'ocFM2CRIpviGiuFgchOM5I8xeR808Mq1',
//     host: 'redis-18216.c240.us-east-1-3.ec2.redns.redis-cloud.com',
//     port: 18216
// })
export const redis = new Redis({
    password: 'ocFM2CRIpviGiuFgchOM5I8xeR808Mq1',
    host: 'redis-18216.c240.us-east-1-3.ec2.redns.redis-cloud.com',
    port: 18216
})

export const REDIS_KEY = {
    ACARA: "ACARA_RDS_KEY",
    SUBACARA: "SUBACARA_RDS_KEY",
    USER: "USER_RDS_KEY",
    ANGGOTA: "ANGGOTA_RDS_KEY",
    ANGKATAN: "ANGKATAN_RDS_KEY",
    ABSENSI: "ABSENSI_RDS_KEY",
    PRESTASI: "PRESTASI_RDS_KEY",
}

export const RedisFunction = <T>(key: string) => {
    const repository = new SortedItemRepository<T>(key, redis)
    const get = async<T>(page: number = 1, perPage: number = 10) => {
        return await repository.getPaginated(page, perPage)
    }
    const getAll = async<T>() => {
        return await repository.getAll()
    }
    const set = async<T>(data: T[]): Promise<any> => {
        const dts = data.map(item => ({
            id: randomUUID(),
            data: item
        }))
        return dts.map(async (i: IItem<any>) => {
            await repository.set(i)
        })
    }


    return {
        set, get, getAll
    }
}
// export const RedisFunction = {
//     get: async<T = string>(redisKey: string): Promise<T | null> => {
//         const data = await redis.get(redisKey)
//         return data ? JSON.parse(data) : null
//     },
//     set: async<T>(redisKey: string, redisValue: T) => {
//         return await redis.set(redisKey, JSON.stringify(redisValue))
//     },
//     delete: async (redisKey: string) => {
//         await redis.del(redisKey)
//     },
//     keys: async (pattern: string) => {
//         return await redis.keys(pattern);
//     },
//     zAddArray: async (redisKey: string, values: []): Promise<number> => {
//         // Menambahkan array objek ke dalam sorted set
//         const promises = values.map(value => redis.zAdd(redisKey, value));
//         return (await Promise.all(promises)).reduce((a, b) => a + b, 0);

//     }
// }
// export const getRedisWithFilter = async (redisKey: string, query: Query) => {
//     const { page = '1', perPage = '10', search = '' } = query

//     const data = await RedisFunction.keys(`*${redisKey}*`)
//     let result = data
//     if (search) {
//         result?.filter(i => i?.includes(search))
//     }

//     const meta = result.slice((Number(page) - 1) * Number(perPage), Number(page) * Number(perPage));
//     const items = await Promise.all(result.map(async key => {
//         const item = await RedisFunction.get(key);
//         return { key, ...item };
//     }));


// }
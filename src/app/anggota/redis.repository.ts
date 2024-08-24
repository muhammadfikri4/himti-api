import { Repository } from "redis-om";
import { anggotaSchema } from "schema/anggota";
import { redis } from "utils/Redis";
import { anggotaDTOMapperFromRedis } from "./anggotaMapper";

const anggotaRepository = new Repository(anggotaSchema, redis)


export const GetAnggotaQuery = async (search?: string, st?: boolean) => {
    let queries = await anggotaRepository.search()

    if (search) {
        queries = queries
            .where('name').equals(search)
            .or('nim').equals(search);
    }

    if (st !== undefined) {
        queries = queries.or('isActive').matches(st);
    }

    const results = await queries.return.all();
    const dataParse = anggotaDTOMapperFromRedis(results)
    return dataParse;
};
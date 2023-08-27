import { z } from "zod";

export const ZSubEntry = z.object({
    sub_entry : z.string().nonempty(),
    definition: z.array(z.string().nonempty("Tidak boleh kosong")),
    example: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
    homonym_number: z.number().int(),
    sense_number: z.number().int(),
    phonetic_form: z.string().nonempty("Tidak boleh Kosong"),
    part_of_speech: z.string().nonempty("Tidak boleh Kosong"),
    example_gloss: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
    
})

export type  ISubEntry = z.infer<typeof ZSubEntry>

export const ZWords = z.object({
    lexem: z.string().nonempty("Tidak boleh kosong"),
    definition: z.array(z.string().nonempty("Tidak boleh kosong")),
    example: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
    homonym_number: z.number().int(),
    sense_number: z.number().int(),
    phonetic_form: z.string().nonempty("Tidak boleh Kosong"),
    part_of_speech: z.string().nonempty("Tidak boleh Kosong"),
    example_gloss: z.preprocess((data: any) => data.split(","), z.array(z.string().nonempty("Tidak boleh kosong"))),
    relatedWords : z.array(ZSubEntry),
    
})



export type IWords = z.infer<typeof ZWords>


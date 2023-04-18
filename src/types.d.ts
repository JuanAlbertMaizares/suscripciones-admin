// .d.ts es un archivo que solo puede tener definiciónes de tipos de TypeScript
// sin funciones, clases, etc.

//nte . tipo de dato que representa un suscriptor
export interface Sub {
    nick: string
    subMonths: number
    avatar: string
    description?: string
}

// type 
export type SubsResponseFromAPI = Array<{
    nick: string
    months: number
    profileUrl: string
    description: string
}>
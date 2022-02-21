export interface IPokemon {
    abilities?: IAbilityItem[],
    name?: string,
    evolutionFrom?: string,
    weight?: number,
    height?: number,
    base_experience?: number,
    stats?: {
        base_stat?: number,
        stat?: {
            name?: string
        }
    }[]
    evolutionChain?: {
        name?: string,
        url?: string
    }[],
    evolution_chain?: {
        url?: string
    },
    sprites?: ISprites,
    types?: {
        slot?: number,
        type?: IType
    }[]
}
export interface IType {
    name?: string,
    url?: string
}

export interface ISprites {
    back_default?: string,
    back_female?: string,
    back_shiny?: string,
    back_shiny_female?: string,
    front_default?: string,
    front_female?: string,
    front_shiny?: string,
    front_shiny_female?: string,
}

export interface IAbilities {
    Abilities: IAbilityItem[]
}
export interface IAbilityItem {
    ability: {
        name: string,
        url: string
    },
    is_hidden: boolean,
    slot: number
}


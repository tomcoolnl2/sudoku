
import { Language } from '../enums'


export type I18n = {
    [key in Language]: {
        numbers: string[]
    }
}

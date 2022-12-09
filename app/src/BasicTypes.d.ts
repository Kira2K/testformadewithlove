declare type Maybe<T> = T | undefined | null
declare type PartialMaybe<T> = { [P in keyof T]?: T[P] | undefined | null }
declare type ErrorFunc ={ (s?: string):void}

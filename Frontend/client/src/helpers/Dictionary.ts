export interface IKeyedCollection<T> {
    Set(key: string, value: T): IKeyedCollection<T>;
    Add(key: string, value: T): IKeyedCollection<T>;
    ContainsKey(key: string): boolean;
    Count(): number;
    Item(key: string): T;
    Keys(): string[];
    RemoveAndGet(key: string): T;   //MUTABLE!!
    Remove(key: string): IKeyedCollection<T>;
    Values(): T[];
}

export class Dictionary<T> implements IKeyedCollection<T> {
    protected items: { [index: string]: T } = {};

    public static FromArray<T>(array: Array<T>, indexKey: keyof T): Dictionary<T> {
        let dict = new Dictionary<T>();

        const normalizedObject: any = {};
        for (let i = 0; i < array.length; i++) {
            const key = array[i][indexKey];
            normalizedObject[key] = array[i];
        }
        dict.items =  normalizedObject as { [key: number]: T }
        return dict;
    }

    private count: number = 0;

    public ContainsKey(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Set(key: string, value: T): Dictionary<T> {
        let dict = Object.assign({}, this);
        if(!dict.items.hasOwnProperty(key))
            dict.count++;

        dict.items[key] = value;
        return dict;
    }
    public Add(key: string, value: T): Dictionary<T> {
        return this.Set(key, value);
    }

    public Remove(key: string): Dictionary<T> {
        let dict = Object.assign({}, this);
        delete dict.items[key];
        dict.count--;
        return dict;
    }

    public RemoveAndGet(key: string): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }

    public Item(key: string): T {
        return this.items[key];
    }

    public Keys(): string[] {
        return Object.keys(this.items);
    }

    public Values(): T[] {
        return this.Keys().map(key => this.items[key])
    }

}

export interface IndexedCollection<T> {
    Set(value: T): IndexedCollection<T>;
    ContainsIndex(key: string): boolean;
    Count(): number;
    Get(key: string): T;
    Keys(): string[];
    RemoveAndGet(key: string): T;   //MUTABLE!!
    Remove(key: string): IndexedCollection<T>;
    Values(): T[];
}

export class IndexedDictionary<T> implements IndexedCollection<T> {

    private readonly indexKey: keyof T;
    private readonly items: { [index: string]: T } = {};
    private count: number = 0;

    public constructor(indexKey: keyof T, array: Array<T> = []) {
        this.indexKey = indexKey;
        const normalizedObject: any = {};
        for (let i = 0; i < array.length; i++) {
            const key = array[i][indexKey];
            normalizedObject[key] = array[i];
        }
        this.items = normalizedObject as { [key: string]: T }

    }

    public ContainsIndex(key: string): boolean {
        return this.items.hasOwnProperty(key);
    }

    public Count(): number {
        return this.count;
    }

    public Set(value: T): IndexedDictionary<T> {
        const key = value[this.indexKey].toString();
        let dict = Object.assign( Object.create( Object.getPrototypeOf(this)), this);

        if(!dict.items.hasOwnProperty(key))
            dict.count++;

        dict.items[key] = value;
        return dict;
    }

    public Remove(key: string): IndexedDictionary<T> {
        let dict = Object.assign( Object.create( Object.getPrototypeOf(this)), this);
        delete dict.items[key];
        dict.count--;
        return dict;
    }

    public RemoveAndGet(key: string): T {
        const val = this.items[key];
        delete this.items[key];
        this.count--;
        return val;
    }
    public Get(key: string): T {
        return this.Keys().filter(k => k === key).map(k => this.items[k]).pop();
    }
    public Keys(): string[] {
        return Object.keys(this.items);
    }
    public Values(): T[] {
        return this.Keys().map(key => this.items[key])
    }

}
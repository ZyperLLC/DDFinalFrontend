import {
    Cell,
    Slice,
    Address,
    Builder,
    beginCell,
    TupleReader,
    Dictionary,
    contractAddress,
    ContractProvider,
    Sender,
    Contract,
    ContractABI,
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

export function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

export function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type SignedBundle = {
    $$type: 'SignedBundle';
    signature: Buffer;
    signedData: Slice;
}

export function storeSignedBundle(src: SignedBundle) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBuffer(src.signature);
        b_0.storeBuilder(src.signedData.asBuilder());
    };
}

export function loadSignedBundle(slice: Slice) {
    const sc_0 = slice;
    const _signature = sc_0.loadBuffer(64);
    const _signedData = sc_0;
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function loadGetterTupleSignedBundle(source: TupleReader) {
    const _signature = source.readBuffer();
    const _signedData = source.readCell().asSlice();
    return { $$type: 'SignedBundle' as const, signature: _signature, signedData: _signedData };
}

export function storeTupleSignedBundle(source: SignedBundle) {
    const builder = new TupleBuilder();
    builder.writeBuffer(source.signature);
    builder.writeSlice(source.signedData.asCell());
    return builder.build();
}

export function dictValueParserSignedBundle(): DictionaryValue<SignedBundle> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSignedBundle(src)).endCell());
        },
        parse: (src) => {
            return loadSignedBundle(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

export function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

export function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

export function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

export function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

export function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

export function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

export function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

export function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

export function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

export function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

export function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

export function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

export function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

export function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

export function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Bet = {
    $$type: 'Bet';
    player: Address;
    hasNFT: boolean;
    amountBet: bigint;
}

export function storeBet(src: Bet) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.player);
        b_0.storeBit(src.hasNFT);
        b_0.storeCoins(src.amountBet);
    };
}

export function loadBet(slice: Slice) {
    const sc_0 = slice;
    const _player = sc_0.loadAddress();
    const _hasNFT = sc_0.loadBit();
    const _amountBet = sc_0.loadCoins();
    return { $$type: 'Bet' as const, player: _player, hasNFT: _hasNFT, amountBet: _amountBet };
}

export function loadTupleBet(source: TupleReader) {
    const _player = source.readAddress();
    const _hasNFT = source.readBoolean();
    const _amountBet = source.readBigNumber();
    return { $$type: 'Bet' as const, player: _player, hasNFT: _hasNFT, amountBet: _amountBet };
}

export function loadGetterTupleBet(source: TupleReader) {
    const _player = source.readAddress();
    const _hasNFT = source.readBoolean();
    const _amountBet = source.readBigNumber();
    return { $$type: 'Bet' as const, player: _player, hasNFT: _hasNFT, amountBet: _amountBet };
}

export function storeTupleBet(source: Bet) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.player);
    builder.writeBoolean(source.hasNFT);
    builder.writeNumber(source.amountBet);
    return builder.build();
}

export function dictValueParserBet(): DictionaryValue<Bet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBet(src)).endCell());
        },
        parse: (src) => {
            return loadBet(src.loadRef().beginParse());
        }
    }
}

export type EndBetting = {
    $$type: 'EndBetting';
    tonWinningBets: Dictionary<bigint, Bet>;
}

export function storeEndBetting(src: EndBetting) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1448266692, 32);
        b_0.storeDict(src.tonWinningBets, Dictionary.Keys.BigInt(257), dictValueParserBet());
    };
}

export function loadEndBetting(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1448266692) { throw Error('Invalid prefix'); }
    const _tonWinningBets = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserBet(), sc_0);
    return { $$type: 'EndBetting' as const, tonWinningBets: _tonWinningBets };
}

export function loadTupleEndBetting(source: TupleReader) {
    const _tonWinningBets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserBet(), source.readCellOpt());
    return { $$type: 'EndBetting' as const, tonWinningBets: _tonWinningBets };
}

export function loadGetterTupleEndBetting(source: TupleReader) {
    const _tonWinningBets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserBet(), source.readCellOpt());
    return { $$type: 'EndBetting' as const, tonWinningBets: _tonWinningBets };
}

export function storeTupleEndBetting(source: EndBetting) {
    const builder = new TupleBuilder();
    builder.writeCell(source.tonWinningBets.size > 0 ? beginCell().storeDictDirect(source.tonWinningBets, Dictionary.Keys.BigInt(257), dictValueParserBet()).endCell() : null);
    return builder.build();
}

export function dictValueParserEndBetting(): DictionaryValue<EndBetting> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeEndBetting(src)).endCell());
        },
        parse: (src) => {
            return loadEndBetting(src.loadRef().beginParse());
        }
    }
}

export type WithdrawTon = {
    $$type: 'WithdrawTon';
    amount: bigint;
}

export function storeWithdrawTon(src: WithdrawTon) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(4206811366, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawTon(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 4206811366) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawTon' as const, amount: _amount };
}

export function loadTupleWithdrawTon(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'WithdrawTon' as const, amount: _amount };
}

export function loadGetterTupleWithdrawTon(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'WithdrawTon' as const, amount: _amount };
}

export function storeTupleWithdrawTon(source: WithdrawTon) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserWithdrawTon(): DictionaryValue<WithdrawTon> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawTon(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawTon(src.loadRef().beginParse());
        }
    }
}

export type UserWithdrawal = {
    $$type: 'UserWithdrawal';
    amount: bigint;
}

export function storeUserWithdrawal(src: UserWithdrawal) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2078995104, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadUserWithdrawal(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078995104) { throw Error('Invalid prefix'); }
    const _amount = sc_0.loadCoins();
    return { $$type: 'UserWithdrawal' as const, amount: _amount };
}

export function loadTupleUserWithdrawal(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'UserWithdrawal' as const, amount: _amount };
}

export function loadGetterTupleUserWithdrawal(source: TupleReader) {
    const _amount = source.readBigNumber();
    return { $$type: 'UserWithdrawal' as const, amount: _amount };
}

export function storeTupleUserWithdrawal(source: UserWithdrawal) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

export function dictValueParserUserWithdrawal(): DictionaryValue<UserWithdrawal> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUserWithdrawal(src)).endCell());
        },
        parse: (src) => {
            return loadUserWithdrawal(src.loadRef().beginParse());
        }
    }
}

export type BetGame$Data = {
    $$type: 'BetGame$Data';
    owner: Address;
    bettingStarted: boolean;
    bettingRound: bigint;
    userBalance: Dictionary<Address, bigint>;
}

export function storeBetGame$Data(src: BetGame$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.bettingStarted);
        b_0.storeInt(src.bettingRound, 257);
        b_0.storeDict(src.userBalance, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
    };
}

export function loadBetGame$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _bettingStarted = sc_0.loadBit();
    const _bettingRound = sc_0.loadIntBig(257);
    const _userBalance = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), sc_0);
    return { $$type: 'BetGame$Data' as const, owner: _owner, bettingStarted: _bettingStarted, bettingRound: _bettingRound, userBalance: _userBalance };
}

export function loadTupleBetGame$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _bettingStarted = source.readBoolean();
    const _bettingRound = source.readBigNumber();
    const _userBalance = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'BetGame$Data' as const, owner: _owner, bettingStarted: _bettingStarted, bettingRound: _bettingRound, userBalance: _userBalance };
}

export function loadGetterTupleBetGame$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _bettingStarted = source.readBoolean();
    const _bettingRound = source.readBigNumber();
    const _userBalance = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4), source.readCellOpt());
    return { $$type: 'BetGame$Data' as const, owner: _owner, bettingStarted: _bettingStarted, bettingRound: _bettingRound, userBalance: _userBalance };
}

export function storeTupleBetGame$Data(source: BetGame$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeBoolean(source.bettingStarted);
    builder.writeNumber(source.bettingRound);
    builder.writeCell(source.userBalance.size > 0 ? beginCell().storeDictDirect(source.userBalance, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4)).endCell() : null);
    return builder.build();
}

export function dictValueParserBetGame$Data(): DictionaryValue<BetGame$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBetGame$Data(src)).endCell());
        },
        parse: (src) => {
            return loadBetGame$Data(src.loadRef().beginParse());
        }
    }
}

 type BetGame_init_args = {
    $$type: 'BetGame_init_args';
    owner: Address;
    bettingStarted: boolean;
    bettingRound: bigint;
    userBalance: Dictionary<Address, bigint>;
}

function initBetGame_init_args(src: BetGame_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeBit(src.bettingStarted);
        b_0.storeInt(src.bettingRound, 257);
        b_0.storeDict(src.userBalance, Dictionary.Keys.Address(), Dictionary.Values.BigVarUint(4));
    };
}

async function BetGame_init(owner: Address, bettingStarted: boolean, bettingRound: bigint, userBalance: Dictionary<Address, bigint>) {
    const __code = Cell.fromHex('b5ee9c724102140100037c0003e2ff008e88f4a413f4bcf2c80bed53208f5c30eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0fa40d200810101d700f40455306c1405925f05e07024d74920c21fe30001c00001c121b08e125f05f842c8cf8508ce70cf0b6ec98042fb00e003f90120e1ed43d9010c11020271020702012003050135b94a7ed44d0fa40d200810101d700f40455306c145503db3c6c41804002e81010b220259f40a6fa193fa003092306de2206ef2d0800131b851ded44d0fa40d200810101d700f40455306c14db3c6c41806000223020166080a0131b3a37b51343e90348020404075c03d01154c1b0536cf1b1060090008f8276f100131b388fb51343e90348020404075c03d01154c1b0536cf1b10600b00022103fe3104d31f2182107beaf2a0ba8e5b6c51fa0030f8416f2410235f030281010b2359f40a6fa193fa003092306de281550901206ef2d08022bef2f47270136d5520c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00f842c8cf8508ce70cf0b6ec98042fb00db31e02182105652cbc4bae302218210fabed8e6bae302210d0f1002fe313403f404304134db3c5f0420810101f4856fa520911295316d326d01e2908e5d206e92306d9dd0fa40d200fa0055206c136f03e2206ef2d0806f230198810302a88064a90492a707e27270136d5520c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00810101220259f4786fa5209402d4305895316d326d01e2e8120e00085f03db310158313403fa00304134db3c5f03017270136d5520c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00db311201c68210819dbe99ba8ed8313403d33ffa40305045db3c335134c8598210327b2b4a5003cb1fcb3fcec94330f8427f705003804201503304c8cf8580ca00cf8440ce01fa02806acf40f400c901fb00c855305034ceca00810101cf00f400c9ed54db31e0051202f882f05838f9565baa189f5d1ec3946b8eccc609bd2bb070777a91ec98b47eecda3767ba8eac304003db3c327f01a4f842c8cf8508ce70cf0b6ec98042fb0058c855305034ceca00810101cf00f400c9ed54e082f0a34a48aa7d7a6204cd9791c95cee4318f5d0a056f33d5a2b0ff37a17df527978bae3025f04f2c08212130010f84224c705f2e0840064f8416f243032102581010b02206e953059f4593098c801fa024133f441e24330c855305034ceca00810101cf00f400c9ed54eda4d9bd');
    const builder = beginCell();
    initBetGame_init_args({ $$type: 'BetGame_init_args', owner, bettingStarted, bettingRound, userBalance })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const BetGame_errors = {
    2: { message: "Stack underflow" },
    3: { message: "Stack overflow" },
    4: { message: "Integer overflow" },
    5: { message: "Integer out of expected range" },
    6: { message: "Invalid opcode" },
    7: { message: "Type check error" },
    8: { message: "Cell overflow" },
    9: { message: "Cell underflow" },
    10: { message: "Dictionary error" },
    11: { message: "'Unknown' error" },
    12: { message: "Fatal error" },
    13: { message: "Out of gas error" },
    14: { message: "Virtualization error" },
    32: { message: "Action list is invalid" },
    33: { message: "Action list is too long" },
    34: { message: "Action is invalid or not supported" },
    35: { message: "Invalid source address in outbound message" },
    36: { message: "Invalid destination address in outbound message" },
    37: { message: "Not enough Toncoin" },
    38: { message: "Not enough extra currencies" },
    39: { message: "Outbound message does not fit into a cell after rewriting" },
    40: { message: "Cannot process a message" },
    41: { message: "Library reference is null" },
    42: { message: "Library change action error" },
    43: { message: "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree" },
    50: { message: "Account state size exceeded limits" },
    128: { message: "Null reference exception" },
    129: { message: "Invalid serialization prefix" },
    130: { message: "Invalid incoming message" },
    131: { message: "Constraints error" },
    132: { message: "Access denied" },
    133: { message: "Contract stopped" },
    134: { message: "Invalid argument" },
    135: { message: "Code of a contract was not found" },
    136: { message: "Invalid standard address" },
    138: { message: "Not a basechain address" },
    21769: { message: "User has less funds" },
} as const

export const BetGame_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
    "User has less funds": 21769,
} as const

const BetGame_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"SignedBundle","header":null,"fields":[{"name":"signature","type":{"kind":"simple","type":"fixed-bytes","optional":false,"format":64}},{"name":"signedData","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Bet","header":null,"fields":[{"name":"player","type":{"kind":"simple","type":"address","optional":false}},{"name":"hasNFT","type":{"kind":"simple","type":"bool","optional":false}},{"name":"amountBet","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"EndBetting","header":1448266692,"fields":[{"name":"tonWinningBets","type":{"kind":"dict","key":"int","value":"Bet","valueFormat":"ref"}}]},
    {"name":"WithdrawTon","header":4206811366,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UserWithdrawal","header":2078995104,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BetGame$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"bettingStarted","type":{"kind":"simple","type":"bool","optional":false}},{"name":"bettingRound","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"userBalance","type":{"kind":"dict","key":"address","value":"uint","valueFormat":"coins"}}]},
]

const BetGame_opcodes = {
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "EndBetting": 1448266692,
    "WithdrawTon": 4206811366,
    "UserWithdrawal": 2078995104,
}

const BetGame_getters: ABIGetter[] = [
    {"name":"bettingRound","methodId":114211,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"contractBalance","methodId":110221,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"userBalance","methodId":70823,"arguments":[{"name":"userAddress","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"owner","methodId":83229,"arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const BetGame_getterMapping: { [key: string]: string } = {
    'bettingRound': 'getBettingRound',
    'contractBalance': 'getContractBalance',
    'userBalance': 'getUserBalance',
    'owner': 'getOwner',
}

const BetGame_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"startbet"}},
    {"receiver":"internal","message":{"kind":"text","text":"depositton"}},
    {"receiver":"internal","message":{"kind":"typed","type":"UserWithdrawal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"EndBetting"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawTon"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
]


export class BetGame implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = BetGame_errors_backward;
    public static readonly opcodes = BetGame_opcodes;
    
    static async init(owner: Address, bettingStarted: boolean, bettingRound: bigint, userBalance: Dictionary<Address, bigint>) {
        return await BetGame_init(owner, bettingStarted, bettingRound, userBalance);
    }
    
    static async fromInit(owner: Address, bettingStarted: boolean, bettingRound: bigint, userBalance: Dictionary<Address, bigint>) {
        const __gen_init = await BetGame_init(owner, bettingStarted, bettingRound, userBalance);
        const address = contractAddress(0, __gen_init);
        return new BetGame(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new BetGame(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BetGame_types,
        getters: BetGame_getters,
        receivers: BetGame_receivers,
        errors: BetGame_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | "startbet" | "depositton" | UserWithdrawal | EndBetting | WithdrawTon | ChangeOwner) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === "startbet") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === "depositton") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'UserWithdrawal') {
            body = beginCell().store(storeUserWithdrawal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'EndBetting') {
            body = beginCell().store(storeEndBetting(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawTon') {
            body = beginCell().store(storeWithdrawTon(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBettingRound(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('bettingRound', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getContractBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('contractBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getUserBalance(provider: ContractProvider, userAddress: Address) {
        const builder = new TupleBuilder();
        builder.writeAddress(userAddress);
        const source = (await provider.get('userBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('owner', builder.build())).stack;
        const result = source.readAddress();
        return result;
    }
    
}
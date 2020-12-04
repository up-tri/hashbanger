import URLHashbang from '../hashbanger';

describe('#delete', () => {
  test('valid', () => {
    const urlHashbang = new URLHashbang();
  });
});
// describe('#entries', () => {
//   test('valid', () => {
//     const urlHashbang = new URLHashbang();
//   });
// });
describe('#get', () => {
  test('valid multiple items', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    expect(urlHashbang.get('key1')).toEqual('value1');
    expect(urlHashbang.get('key2')).toEqual('value2');
  });
});
// describe('#getAll', () => {
//   test('valid', () => {
//     const urlHashbang = new URLHashbang();
//   });
// });
describe('#keys', () => {
  test('empty', () => {
    const urlHashbang = new URLHashbang();
    expect(urlHashbang.keys()).toEqual([]);
  });
  test('single item', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    expect(urlHashbang.keys()).toEqual(['key1']);
  });
  test('multiple items', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    urlHashbang.append('key3', 'value3');
    expect(urlHashbang.keys()).toEqual(['key1', 'key2', 'key3']);
  });
});
describe('#has', () => {
  test('empty', () => {
    const urlHashbang = new URLHashbang();
    expect(urlHashbang.has('key1')).toBeFalsy();
  });
  test('single item', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    expect(urlHashbang.has('key1')).toBeTruthy();
    expect(urlHashbang.has('key2')).toBeFalsy();
  });
  test('multiple items', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    urlHashbang.append('key3', 'value3');
    expect(urlHashbang.has('key1')).toBeTruthy();
    expect(urlHashbang.has('key2')).toBeTruthy();
    expect(urlHashbang.has('key3')).toBeTruthy();
    expect(urlHashbang.has('key4')).toBeFalsy();
  });
});
describe('#set', () => {
  test('empty', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.set('key1', 'another1');
    expect(urlHashbang.get('key1')).toEqual('another1');
  });
  test('single item', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.set('key1', 'another1');
    expect(urlHashbang.get('key1')).toEqual('another1');
  });
  test('multiple items', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    urlHashbang.append('key3', 'value3');
    urlHashbang.set('key1', 'another1');
    expect(urlHashbang.get('key1')).toEqual('another1');
    expect(urlHashbang.get('key2')).toEqual('value2');
    expect(urlHashbang.get('key3')).toEqual('value3');
  });
});
describe('#sort', () => {
  test('alphabet', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('orange', 'value3');
    urlHashbang.append('apple', 'value1');
    urlHashbang.append('banana', 'value2');
    urlHashbang.sort();
    expect(urlHashbang.toString()).toEqual(
      'apple=value1&banana=value2&orange=value3',
    );
  });
  test('jp', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('オレンジ', 'value3');
    urlHashbang.append('アップル', 'value1');
    urlHashbang.append('バナナ', 'value2');
    urlHashbang.sort();
    expect(urlHashbang.toString()).toEqual(
      'アップル=value1&オレンジ=value3&バナナ=value2',
    );
  });
});
describe('#append, #toString', () => {
  test('valid single item', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    expect(urlHashbang.toString()).toEqual('key1=value1');
  });
  test('valid single jp item', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('キー', 'バリュー');
    expect(urlHashbang.toString()).toEqual('キー=バリュー');
  });
  test('valid multiple items', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    expect(urlHashbang.toString()).toEqual('key1=value1&key2=value2');
  });
  // not work!
  // test('valid multiple items with same keyname', () => {
  //   const urlHashbang = new URLHashbang();
  //   urlHashbang.append('key', 'value1');
  //   urlHashbang.append('key', 'value2');
  //   urlHashbang.append('key', 'value3');
  //   expect(urlHashbang.toString()).toEqual(
  //     'key[]=value1&key[]=value2&key[]=value3',
  //   );
  // });
  test('custom delimiter', () => {
    const urlHashbang = new URLHashbang(null, '$');
    urlHashbang.append('key1', 'value1');
    urlHashbang.append('key2', 'value2');
    expect(urlHashbang.toString()).toEqual('key1=value1$key2=value2');
  });
  test('invalid keyname should not be append', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('', 'value1');
    urlHashbang.append('', 'value2');
    expect(urlHashbang.toString()).toEqual('');
  });
  test('empty value should be appeneded', () => {
    const urlHashbang = new URLHashbang();
    urlHashbang.append('key1', '');
    urlHashbang.append('key2', '');
    expect(urlHashbang.toString()).toEqual('key1=&key2=');
  });
});

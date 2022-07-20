import { test, expect } from '@jest/globals';

import buildDiffTree from '../src/diff_tree.js';

test('test plain', () => {
  const data1 = {
    host: "hexlet.io",
    timeout: 50,
    proxy: "123.234.53.22",
    follow: false,
  };
  
  const data2 = {
    timeout: 20,
    verbose: true,
    host: "hexlet.io",
  };
  
  const expectedObject = [
    {name: "follow", type: "removed", oldValue: false, newValue: null},
    {name: "host", type: "unchanged", oldValue: "hexlet.io", newValue: "hexlet.io"},
    {name: "proxy", type: "removed", oldValue: "123.234.53.22", newValue: null},
    {name: "timeout", type: "changed", oldValue: 50, newValue: 20},
    {name: "verbose", type: "added", oldValue: null, newValue: true},
  ];
  
  expect(buildDiffTree(data1, data2)).toMatchObject(expectedObject)
});


test('test recursive', () => {
  const data1 = {
    common: {
      setting1: "Value 1",
      setting2: 200,
      setting3: true,
      setting6: {
        key: "value",
        doge: { wow: "" },
      },
    },
    group1: {
      baz: "bas",
      foo: "bar",
      nest: { key: "value" },
    },
    group2: {
      abc: 12345,
      deep: { id: 45 },
    },
  };
  
  const data2 = {
    common: {
      follow: false,
      setting1: "Value 1",
      setting3: null,
      setting4: "blah blah",
      setting5: { key5: "value5" },
      setting6: {
        key: "value",
        ops: "vops",
        doge: { wow: "so much" },
      },
    },
    group1: {
      foo: "bar",
      baz: "bars",
      nest: "str",
    },
    group3: {
      fee: 100500,
      deep: { id: { number: 45 } },
    },
  };

  const expectedObject = [
    {name: "common", type: "nested", children: [
      {name: "follow", type: "added", oldValue: null, newValue: false},
      {name: "setting1", type: "unchanged", oldValue: "Value 1", newValue: "Value 1"},
      {name: "setting2", type: "removed", oldValue: 200, newValue: null},
      {name: "setting3", type: "changed", oldValue: true, newValue: null},
      {name: "setting4", type: "added", oldValue: null, newValue: "blah blah"},
      {name: "setting5", type: "added", oldValue: null, newValue: {key5: "value5"}},
      {name: "setting6", type: "nested", children: [
        {name: "doge", type: "nested", children: [
          {name: "wow", type: "changed", oldValue: "", newValue: "so much"}
        ]},
        {name: "key", type: "unchanged", oldValue: "value", newValue: "value"},
        {name: "ops", type: "added", oldValue: null, newValue: "vops"}
      ]}
    ]},
    {name: "group1", type: "nested", children: [
      {name: "baz", type: "changed", oldValue: "bas", newValue: "bars"},
      {name: "foo", type: "unchanged", oldValue: "bar", newValue: "bar"},
      {name: "nest", type: "changed", oldValue: {key: "value"}, newValue: "str"}
    ]},
    {name: "group2", type: "removed", oldValue: {abc: 12345, deep: {id: 45}}, newValue: null},
    {name: "group3", type: "added", oldValue: null, newValue: {fee: 100500, deep: {id: {number: 45}}}}
  ];

  expect(buildDiffTree(data1, data2)).toMatchObject(expectedObject);
});

---
order: 1
title: 使用文档
---

## 示例

```jsx
import React from 'react';
import FormRender, { useForm } from 'myapp';

const schema = {
  type: 'object',
  labelWidth: 120,
  displayType: 'row',
  properties: {
    'list_-RKW9y': {
      title: '明细分组33333',
      type: 'array',
      controlType: 'array',
      items: {
        type: 'object',
        properties: {
          input_ruxFn9: {
            title: '文本输入框',
            type: 'string',
            controlType: 'string',
            dataFieldType: '2',
            props: {},
          },
        },
      },
      dataFieldType: '2',
      props: {
        hideDelete: '{{formData["list_-RKW9y"].length === "1"}}',
      },
    },
  },
};

export default function Demo() {
  const form = useForm();

  return <FormRender form={form} schema={schema} />;
}
```

## 文档

https://x-render.gitee.io/tools/generator

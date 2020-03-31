# IntakeQ API

A wrapper around the [IntakeQ](https://intakeq.com/) APIs. Written in TypeScript.

## Usage

```
npm install --save @lifebac/intakeq
```

Simply instantiate the API with your API Key and you should be able to start using it.

```ts
import { IntakeQApi } from '@lifebac/intakeq';

const IntakeQClient = new IntakeQApi('api-key-in-here');

const listClients = async () => {
  const res = await IntakeQClient.Client.listClients(
    { search: 'john.smith@example.com' },
    true
  );

  // Do something with the result
  console.log(res);
};

listClients();
```

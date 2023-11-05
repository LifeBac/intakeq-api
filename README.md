
```ts
import { IntakeQApi } from '@lifebac/intakeq';

const IntakeQClient = new IntakeQApi('6f712367909d4bb31a84b5780c03e3f82ef9cd65');

const listClients = async () => {
  const res = await IntakeQClient.Client.listClients(
    { search: 'john.smith@example.com' },
    true
  );


  console.log(res);
};

listClients();
```


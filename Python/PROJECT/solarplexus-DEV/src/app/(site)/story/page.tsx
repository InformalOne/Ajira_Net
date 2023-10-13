import React from 'react';
import Button from '~/app/(site)/components/forms/Button';
import Input from '~/app/(site)/components/forms/Input';
import CheckBox from '~/app/(site)/components/forms/CheckBox';
import TableCheckbox from '~/app/(site)/components/Table/TableCheckbox';

const Story = () => {
  return (
    <div>
      <h2 className="text-[26px] font-bold text-grey-800">Common Components</h2>
      <p className="text-sm font-semibold text-grey-800">
        These are common components which are being used as in this project.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Button>Contained, Primary, Md Button</Button>
        <Button color="secondary">Contained, Secondary, Md Button</Button>
        <Button color="grey">Contained, Grey, Md Button</Button>

        <Button size="sm">Contained, Primary, Sm Button</Button>
        <Button color="secondary" size="sm">Contained, Secondary, Sm Button</Button>
        <Button color="grey" size="sm">Contained, Grey, Sm Button</Button>

        <Button variant="outline">Outlined, Primary, Md Button</Button>
        <Button variant="outline" color="secondary">Outlined, Secondary, Md Button</Button>
        <Button variant="outline" color="grey">Outlined, Grey, Md Button</Button>

        <Button variant="text">Text, Primary, Md Button</Button>
        <Button variant="text" color="secondary">Text, Secondary, Md Button</Button>
        <Button variant="text" color="grey">Text, Grey, Md Button</Button>
      </div>

      <div className="flex flex-wrap gap-4 mt-10">
        <Input size="xl" />
        <Input size="lg" />
        <Input size="base" />
        <Input size="md" />
        <Input size="sm" />

        <CheckBox label="Checkbox" />
      </div>

      <div className="flex flex-wrap gap-4 mt-10">
        <TableCheckbox />
        <TableCheckbox checked />
        <TableCheckbox checking />
      </div>
    </div>
  )
}

export default Story;

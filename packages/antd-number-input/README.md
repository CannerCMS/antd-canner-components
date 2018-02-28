# @canner/antd-number-input

## API

### Props:

<table>
  <thead>
    <tr>
      <th style="width: 100px;">name</th>
      <th style="width: 50px;">type</th>
      <th>default</th>
      <th>description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>String</td>
      <th></th>
      <td>Field id</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <th></th>
      <td>Default value</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>Boolean</td>
      <th></th>
      <td>Whether input is disabled</td>
    </tr>
    <tr>
      <td>uiParams</td>
      <td>
        <code>
          uiParams: {
            min: number,
            max: number,
            step: number,
            unit: string
          }
        </code>
      </td>
      <th></th>
      <td>Setup params</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>(id: string, type: string, value: string) => void</td>
      <th></th>
      <td>Called when input is changed</td>
    </tr>
  </tbody>
</table>
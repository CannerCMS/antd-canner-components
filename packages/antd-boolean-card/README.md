# @canner/antd-boolean-card

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
      <td>uiParams</td>
      <td>
        <code>
          uiParams: {
            yesText: string,
            noText: string,
            yesImg: string,
            noImg: string,
            imgStyle: { [string]: any },
            labelStyle: { [string]: any }
          }
        </code>
      </td>
      <th></th>
      <td>Setup format and output format</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>(id: string, type: string, value: string) => void</td>
      <th></th>
      <td>Called when input is changed</td>
    </tr>
  </tbody>
</table>
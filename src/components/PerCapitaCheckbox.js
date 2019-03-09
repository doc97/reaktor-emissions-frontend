import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const PerCapitaCheckbox = ({ togglePerCapita }) => (
  <div>
    <Checkbox
      label={{ children: 'Per capita' }}
      onChange={togglePerCapita} />
  </div>
)

export default PerCapitaCheckbox
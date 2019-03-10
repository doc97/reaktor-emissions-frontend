import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const PerCapitaCheckbox = ({ togglePerCapita }) => (
  <div>
    <Checkbox toggle
      label={'Per capita'}
      onChange={togglePerCapita} />
  </div>
)

export default PerCapitaCheckbox
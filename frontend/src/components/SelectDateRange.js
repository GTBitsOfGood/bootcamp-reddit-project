import React from 'react'

const SelectDateRange = props => {
  const [selected, setSelected] = React.useState('Past week')
  const onChangeSelected = ({ target }) => {
    const selectedDateRange = target.value
    // set local state for selected value
    setSelected(selectedDateRange)
    // make API call
    props.onSelect(selectedDateRange)
  }

  return (
    <form>
      <label>Show me posts from...</label>
      <select value={selected} onChange={onChangeSelected}>
        <option>Past week</option>
        <option>Past month</option>
        <option>Past year</option>
        <option>A year ago</option>
        <option>Ancient times</option>
      </select>
    </form>
  )
}

export default SelectDateRange

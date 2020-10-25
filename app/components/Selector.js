import React from "react"

/**
 * A component that displays a horizontal bar from which users can select different options
 *
 * @param {String}   [color]           OPTIONAL: the background color for the selector
 * @param {String}   [selectedColor]   OPTIONAL: the background color of the selected element
 * @param {String}   [title]           OPTIONAL: a title to include at the beginning of the selector
 * @param {String}   [fontSize]        OPTIONAL: the fontSize for within the selector
 * @param {String}   [preSelected]     OPTIONAL: the item in the array to be first selected
 * @param {String[]} items             REQUIRED: an array of strings indicating the options to choose from
 * @param {function} setState          REQUIRED: a function that will set the state to be equal to the value chosen
 */
export default function Selector({ color = "#FFFFF3",
                                   selectedColor = "#FFCED4",
                                   title = null,
                                   fontSize = "18px",
                                   preSelected = null,
                                   items,
                                   setState}) {
  const [selected, setSelected] = React.useState(null)

  React.useEffect(() => {
    if (preSelected != null) { setSelected(preSelected) }
    else { setSelected(items[0])}
  }, [])

  React.useEffect(() => {
    if (selected) { setState(selected) }
    else { setState(null) }
  }, [selected])

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: color,
      padding: "0 10px",
      alignItems: "center",
      borderRadius: "10px",
    },
    title: {
      fontFamily: "heebo-medium",
      fontSize: "24px",
      margin: "0 10px",
    },
    break: {
      margin: "0 5px",
      border: "0",
      borderRight: "2px solid black",
      width: "1px",
      height: "30px",
    },
    list: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    item: {
      flexGrow: "1",
      textAlign: "center",
      fontSize: fontSize,
      fontFamily: "heebo-light",
      display: "block",
      padding: "10px 0",
    },
    active: {
      backgroundColor: selectedColor,
    }
  }

  return (
    <div style={styles.container} className="selector">
      {title &&  (
        <React.Fragment>
          <h4 style={styles.title}>{title}</h4>
          <hr style={styles.break}/>
        </React.Fragment>
      )}
      <ul style={styles.list}>
        {items.map((item, index) => {
          let itemStyle = styles.item
          if (item === selected) {
            itemStyle = {
              ...itemStyle,
              ...styles.active
            }
          }
          return (
          <li className="pointer" key={index} style={itemStyle} onClick={() => setSelected(item)}>
            {item}
          </li>
        )})}
      </ul>
    </div>
  )
}

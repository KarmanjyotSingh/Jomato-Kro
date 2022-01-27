function AddOns(props) {

  const handleAddOnSubmit = (event) => {
    event.preventDefault();
    const my_add_on = {
      name: document.getElementById(`addOnName${props.index}`).value,
      price: document.getElementById(`addOnPrice${props.index}`).value
    };
    if (my_add_on.name === '' || my_add_on.price === '') {
      alert("Fields Can't be Empty");
    } else {
      if (props.addOnNames.length < props.index) {
        alert("Make sure previous add-ons are added before adding new ones");
      } else if (props.addOnNames.length === props.index) {
        props.setAddOnNames([...props.addOnNames, my_add_on.name]);
        props.setAddOnPrices([...props.addOnPrices, my_add_on.price]);
      } else {
        let newNames = [...props.addOnNames];
        let newPrices = [...props.addOnPrices];
        newNames[props.index] = my_add_on.name;
        newPrices[props.index] = my_add_on.price;
        props.setAddOnNames(newNames);
        props.setAddOnPrices(newPrices);
      }
    }
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <TextField
          id={`addOnName${props.index}`}
          label="Add On Name"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          id={`addOnPrice${props.index}`}
          label="Add On Price"
          fullWidth
          size="small"
          type="number"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          onClick={handleAddOnSubmit}
          fullWidth
          variant="contained"
        >
          Submit Add On
        </Button>
      </Grid>
    </Grid>
  );
}
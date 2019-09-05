({
	setArray: function (cmp, event, source, destination, item) {

        var selectedId = event.getSource().get(item);
        var sourceList = cmp.get(source);
        var destinationList = cmp.get(destination);

        sourceList.forEach((option, index) => {
            if (option.Id == selectedId) {
                destinationList.push(option);
                sourceList.splice(index, 1);

            }
        });
        cmp.set(source, sourceList);
        cmp.set(destination, destinationList);
    }
})
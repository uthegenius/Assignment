({
    loadOptions: function (component, event, helper) {
        console.log('Opportunity Stages:'+ component.get("v.stages")); 
        component.set("v.status", "");
        var action = component.get("c.getOpportunities");
        action.setParams({
            "stages": component.get("v.stages")
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                component.set("v.opportunities", response);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    
    updateStatus:function(component, event, helper){
        console.log('Selected Checkboxes: '+component.get("v.selectedCheckBoxes"));
        if(component.get("v.selectedCheckBoxes").length > 0){
        var action = component.get("c.updateStatuses");
        action.setParams({
            "Ids": component.get("v.selectedCheckBoxes")
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                alert("Selected opportunities marked closed won successfully");
                var action = component.get("c.getOpportunities");
        action.setParams({
            "stages": component.get("v.stages")
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                component.set("v.opportunities", response);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
        } else{
            alert("Please select an opportunity to update.");
        }
    },
    callCheckboxMethod : function(component, event, helper) {      
        var capturedCheckboxName = event.getSource().get("v.value");
        console.log('Checkbox Selected: '+capturedCheckboxName)
        var selectedCheckBoxes =  component.get("v.selectedCheckBoxes");
        if(selectedCheckBoxes.indexOf(capturedCheckboxName) > -1){            
            selectedCheckBoxes.splice(selectedCheckBoxes.indexOf(capturedCheckboxName), 1);           
        }
        else{
            selectedCheckBoxes.push(capturedCheckboxName);
        }
        component.set("v.selectedCheckBoxes", selectedCheckBoxes);
    }
})
({
    loadOptions: function (component, event, helper) {
        
        var action = component.get("c.getStages");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                for(var i =0; i<response.length; i++){
                    items.push({"Name":response[i], "Id":response[i]});
                }
                component.set("v.stages", items);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    getNewValue: function (component, event, helper) {
        var OptionSel = component.find("mySelect1").get("v.value");
        component.set("v.selectedStage", OptionSel);
        console.log(OptionSel);
    },
    gotoURL:function(component,event,helper){
        console.log('Enter Here');
        console.log('Selected Value:'+event.getParam("stages"));
        $A.createComponent(
         "c:OpportunityComponent",
         {
           "stages" : event.getParam("stages")
         },
         function(newCmp){
             console.log(component.isValid());
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
         }
      );
    },
    navigate:function(component, event, helper){
        var evt = $A.get("e.c:NavigateToC2");
        var selectedOptions = component.find("jobLocationMS").get("v.selectedOptions");
        var items = [];
        for(var item in selectedOptions){
            items.push(selectedOptions[item].Id);
        }
        
      evt.setParams({ "stages": items});
      evt.fire();
    }
})
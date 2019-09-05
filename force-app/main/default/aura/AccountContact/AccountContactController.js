({
    loadOptions: function (component, event, helper) {
        
        var action = component.get("c.getAccounts");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                items.push({"Name":"Please Select Account", "Id":0});
                for(var i =0; i<response.length; i++){
                    items.push({"Name":response[i].Name, "Id":response[i].Id});
                }
                component.set("v.accounts", items);
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
        var items = component.get("v.selectedacc");
        items.push(OptionSel)
        component.set("v.selectedacc", items);
        console.log(items);
    },
    clickCreate: function(component, event, helper) {
        var validExpense = component.find('expenseform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newExpense = component.get("v.newContact");
            console.log("Create Contact: " + JSON.stringify(newExpense));
            var action = component.get("c.saveContact");
            action.setParams({
            "contact": newExpense,
                "Ids": component.get("v.selectedacc")
        });
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var items = [];
                console.log(response.getReturnValue());
                var response = response.getReturnValue();
                console.log('Contact Inserted:'+response);
                alert("Contact added and assigned to selected accounts.");
                window.location.reload();
            }
            else {
                var resp = response;
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
        }
    },
    removeSelectedAccount: function (component, event, helper) {
        helper.setArray(component, event, 'v.selectedAccount', 'v.accounts', 'v.name');
    },
    addSelectedAccount: function (component, event, helper) {
        helper.setArray(component, event, 'v.accounts', 'v.selectedAccount', 'v.value');
    }
})
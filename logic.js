window.actions = {};

actions.add = {};
actions.add.types = [Number, Number, Number];
actions.add.function = function(a, b, c){
    return a + b + c;
}

actions.add1 = {
    types: [Number, Number, Number],
    function: function(a, b, c){
        return a + b + c;
    }   
}

// returns a string with the shortest word first, then the second shortes and last the longest.
actions.sortOnLength = {
    types: [String, String, String],
    function: function(a, b, c){
        if (a.length > b.length && b.length > c.length)
            return  c + " " + b + " " + a;
        if (a.length > c.length && c.length > b.length)
            return b + " " + c + " " + a;
        if (b.length > a.length && a.length > c.length)
            return c + " " + a + " " + b;
        if (b.length > c.length && c.length > a.length)
            return a + " " + c + " " + b;
        if (c.length > a.length && a.length > b.length)
            return b + " " + a + " " + c;
        if (c.length > b.length && b.length > a.length)
            return a + " " + b + " " + c;
    } 

    
};

// returns sårbarhed of a single product
actions.productVulnerability = {
    types: [Number, Number, Number],
    function: function(disruptive, irreplacible, damaging){
        var average = (disruptive + irreplacible + damaging) / 3;
        var categories = ["Ikke Kritisk", "Lav sårbarhed", "Besværlig", "Sårbar", "Kritisk"]
        return categories[average - 1];
    }
}
// returns 'sårbarhed' of the three products in an array
// each product has properties disruptive, irreplacible, and damaging,
actions.vulnerability = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(p1, p2, p3){
        var products = (p1, p2, p3)
        var result = ("FEJL", "FEJL", "FEJL");
        for (var i = 0; i<products.length; i++){
            var currentproduct = products[i];
            result[i] = actions.productVulnerability.function(
                currentproduct.disruptive, 
                currentproduct.irreplacible, 
                currentproduct.damagingbg
            )
        }
        return result;
    }
};



// returns the sum of the ages of the three persons
actions.totalAge = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(alice, bob, cat){
        return ;
    }
};

//returns the average age of the three persons
actions.averageAge = {
    types: [JSON.parse, JSON.parse, JSON.parse],
    function: function(alice, bob, cat){
        return -1;
    }
};

window.runTest = function(actionName, actions, testData){
    var result = "";
    var functionUnderTest = actions[actionName].function;
    var testCases =  testData[actionName];
    for(var i = 0; i  < testCases.length; i++)
        result += testFunctionWith(testCases[i], functionUnderTest);	

    document.getElementById("result").innerHTML = result;
}

window.testFunctionWith = function(testCase, functionUnderTest) {
    var actual = functionUnderTest(testCase.a, testCase.b, testCase.c);
    var passed = actual === testCase.expected;
    var result = `<span style='color: ${passed ? 'green' : 'red'}'>
                    Test ${passed ? "passed" : "failed"}.
                </span>
                <br>`;
    if(!passed)
        result += `Got ${actual} with test input ${JSON.stringify(testCase)}.<br>`;

    return result;
}


try {
    var functions = (await import("./facit.js")).functions;
    for(const fName in functions)
        window.actions[fName].function = functions[fName]; 
} catch (e) {
    console.log("facit.js not found");
}




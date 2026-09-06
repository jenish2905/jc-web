function convertNumber() {

    let input = document.getElementById("number").value.trim();

    let fromBase = parseInt(
        document.getElementById("fromBase").value
    );

    let toBase = parseInt(
        document.getElementById("toBase").value
    );

    let result = document.getElementById("result");
    let error = document.getElementById("error");

    error.innerText = "";

    if (input === "") {
        result.innerText = "0";
        error.innerText = "Please enter a number.";
        return;
    }

    // Remove 0x prefix for hexadecimal
    if (fromBase === 16) {
        input = input.replace(/^0x/i, "");
    }

    // Validate input
    let validPattern;

    if (fromBase === 2) {
        validPattern = /^[01]+(\.[01]+)?$/;
    }
    else if (fromBase === 8) {
        validPattern = /^[0-7]+(\.[0-7]+)?$/;
    }
    else if (fromBase === 10) {
        validPattern = /^\d+(\.\d+)?$/;
    }
    else if (fromBase === 16) {
        validPattern = /^[0-9a-fA-F]+(\.[0-9a-fA-F]+)?$/;
    }

    if (!validPattern.test(input)) {
        result.innerText = "Invalid";
        error.innerText =
            "Invalid number for selected number system.";
        return;
    }

    try {

        // Split integer and fraction
        let parts = input.split(".");

        let integerPart = parts[0];
        let fractionalPart = parts[1] || "";

        // Convert integer part to decimal
        let integerDecimal = parseInt(integerPart, fromBase);

        // Convert fractional part to decimal
        let fractionDecimal = 0;

        for (let i = 0; i < fractionalPart.length; i++) {

            let digit = parseInt(fractionalPart[i], fromBase);

            fractionDecimal +=
                digit / Math.pow(fromBase, i + 1);
        }

        // Total decimal value
        let decimalValue =
            integerDecimal + fractionDecimal;

        // Convert integer part to target base
        let integerResult =
            integerDecimal.toString(toBase);

        // Convert fractional part
        let fractionResult = "";

        if (fractionDecimal > 0) {

            let fraction = fractionDecimal;

            let count = 0;

            while (fraction > 0 && count < 20) {

                fraction *= toBase;

                let digit = Math.floor(fraction);

                fractionResult +=
                    digit.toString(toBase);

                fraction -= digit;

                count++;
            }
        }

        // Create final result
        let finalResult = integerResult;

        if (fractionResult !== "") {

            finalResult += "." + fractionResult;
        }

        // Uppercase hexadecimal
        if (toBase === 16) {
            finalResult = finalResult.toUpperCase();
        }

        result.innerText = finalResult;

    }
    catch (err) {

        result.innerText = "Invalid";
        error.innerText = "Conversion error.";
    }
}


function clearAll() {

    document.getElementById("number").value = "";

    document.getElementById("result").innerText = "0";

    document.getElementById("error").innerText = "";
}


function copyResult() {

    let result =
        document.getElementById("result").innerText;

    navigator.clipboard.writeText(result)
        .then(() => {

            alert("Result copied!");

        })
        .catch(() => {

            alert("Unable to copy result.");

        });
}


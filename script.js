// Load the JSON data
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    window.data = data;
  })
  .catch((error) => console.error("Error loading data:", error));

function decodeAndCompare() {
  const base64Input = document.getElementById("base64Input").value;
  const decoded = atob(base64Input);
  const matchingEntry = window.data.find(
    (entry) => entry.encryptedStr === base64Input
  );
  const originalStr = matchingEntry
    ? matchingEntry.originalStr
    : "No match found";

  const outputElement = document.getElementById("output");
  outputElement.innerHTML = `
    <p class="text-gray-700">Decoded: ${decoded}</p>
    <p class="text-gray-700">Original: ${originalStr}</p>
  `;
}

function copyToClipboard() {
  const outputElement = document.getElementById("output");
  const text = outputElement.innerText.trim();
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy:", err);
      alert("Failed to copy to clipboard. Please try again.");
    });
}

function printOutput() {
  const outputElement = document.getElementById("output");
  const text = outputElement.innerText.trim();
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Output</title>
        <style>
          body { font-family: Arial, sans-serif; }
          .output { padding: 1rem; border: 1px solid #ccc; }
          .text-gray-700 { color: #4a5568; }
        </style>
      </head>
      <body>
        <div class="output">
          <p class="text-gray-700">Output:</p>
          <pre>${text}</pre>
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
}

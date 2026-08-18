import { useState } from "react";

export default function FlagSubmissionBox({
  flag
}: {
  flag: string
}) {
  function checkFlag(inputFlag: string) {
    if (inputFlag === flag) {
      alert("Correct flag! 🎉");
    } else {
      alert("Incorrect flag. Try again.");
    }
  }

  const [inputFlag, setInputFlag] = useState("");
  return (
    <div className="border border-gray-300 flex flex-row justify-between items-center rounded-md p-4 mt-6 gap-4 bg-white">
      <input
        type="text"
        placeholder="Enter flag"
        value={inputFlag}
        onChange={(e) => setInputFlag(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-full"
      />
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        onClick={() => checkFlag(inputFlag)}
        type="button"
      >
        Submit
      </button>
    </div>
  )
}

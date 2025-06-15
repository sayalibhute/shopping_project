import React from "react";

function LogOut() {
    return(
        <>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h2>
    <p class="text-gray-600 mb-6">Are you sure you want to logout?</p>
    <div class="flex justify-end space-x-4">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        onclick="closeModal()"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        onclick="logoutUser()"
      >
        Logout
      </button>
    </div>
  </div>
</div>
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Confirm Logout</h2>
    <p class="text-gray-600 mb-6">Are you sure you want to logout?</p>
    <div class="flex justify-end space-x-4">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        //onclick="closeModal()"
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        //onclick="logoutUser()"
      >
        Logout
      </button>
    </div>
  </div>
</div>

        </>
    )

}
export default LogOut;
const DataTable = ({ list, edit, del }) => (
    <table className="w-full border bg-white">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Title</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, i) => (
          <tr key={i}>
            <td className="border p-2">{item.title}</td>
            <td className="border p-2">{item.price}</td>
            <td className="border p-2 space-x-2">
              <button onClick={() => edit(item, i)} className="bg-green-500 px-3 text-white">Edit</button>
              <button onClick={() => del(i)} className="bg-red-500 px-3 text-white">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  export default DataTable;
  
import React, { useState } from "react";

export default function Testing() {
  const dataContact = {
    name: 'Wisnu Kuncoro Ardianto',
    phone: '081389571948'
  }
  const [contact, setContact] = useState({
    name: dataContact.name,
    phone: dataContact.phone,
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <h1>Testing</h1>
      <input type="text" name="name" value={contact.name} onChange={handleChange} className="border border-slate-500" />
      <input type="text" name="phone" value={contact.phone} onChange={handleChange} className="border border-slate-500" />
    </div>
  )
}

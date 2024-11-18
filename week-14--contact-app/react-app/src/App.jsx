import React, { useState } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      firstName: "علی",
      lastName: "بهبودی",
      email: "ali@gmail.com",
      phone: "09123456789",
    },
    {
      id: 2,
      firstName: "سارا",
      lastName: "کریمی",
      email: "sara@gmail.com",
      phone: "09223456789",
    },
    {
      id: 3,
      firstName: "سیامک",
      lastName: "احمدی",
      email: "siamak@gmail.com",
      phone: "09323456789",
    },
    {
      id: 4,
      firstName: "لیلا",
      lastName: "حسینی",
      email: "leila@gmail.com",
      phone: "09134567890",
    },
    {
      id: 5,
      firstName: "امید",
      lastName: "محمدی",
      email: "omid@gmail.com",
      phone: "09123456700",
    },
    {
      id: 6,
      firstName: "زهرا",
      lastName: "وارسته",
      email: "zahra@gmail.com",
      phone: "09133456700",
    },
  ]);

  const [previousContacts, setPreviousContacts] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  const savePreviousContacts = () => {
    setPreviousContacts([...contacts]);
  };

  const handleUndo = () => {
    if (previousContacts) {
      setContacts(previousContacts);
      setPreviousContacts(null);
    }
  };

  const handleDelete = (id) => {
    savePreviousContacts();
    setContacts(contacts.filter((contact) => contact.id !== id));
    setIsModalVisible(false);
  };

  const handleEdit = (contact) => {
    savePreviousContacts();
    setEditingContact(contact);
    setModalType("edit");
    setIsModalVisible(true);
  };

  const handleSaveEdit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(editingContact.email)) {
      alert("ایمیل وارد شده باید معتبر باشد و شامل @gmail.com باشد.");
      return;
    }

    const nameRegex = /^[a-zA-Zآ-ی ]+$/;
    if (
      !nameRegex.test(editingContact.firstName) ||
      !nameRegex.test(editingContact.lastName)
    ) {
      alert("نام و نام خانوادگی فقط باید شامل حروف باشد.");
      return;
    }

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(editingContact.phone)) {
      alert("شماره تلفن باید 11 رقم و شامل اعداد باشد.");
      return;
    }

    if (
      editingContact.firstName &&
      editingContact.lastName &&
      editingContact.email &&
      editingContact.phone
    ) {
      if (editingContact.id === contacts.length + 1) {
        setContacts([...contacts, editingContact]);
      } else {
        setContacts(
          contacts.map((contact) =>
            contact.id === editingContact.id ? editingContact : contact
          )
        );
      }
      setEditingContact(null);
      setIsModalVisible(false);
    } else {
      alert("لطفاً تمامی فیلدها را پر کنید!");
    }
  };

  const handleAddContact = () => {
    const newContact = {
      id: contacts.length + 1,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
    savePreviousContacts();
    setEditingContact(newContact);
    setModalType("add");
    setIsModalVisible(true);
  };

  const handleDeleteSelected = () => {
    savePreviousContacts();
    const selectedContacts = contacts.filter((contact) => contact.selected);
    setContacts(contacts.filter((contact) => !contact.selected));
  };

  const handleSelectContact = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, selected: !contact.selected }
          : contact
      )
    );
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoBack = () => {
    setSearchQuery("");
  };

  const handleShowDeleteModal = (id) => {
    setContactToDelete(id);
    setModalType("delete");
    setIsModalVisible(true);
  };

  return (
    <div className="app">
      <h1>مدیریت مخاطبین</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="جستجو بر اساس نام، نام خانوادگی یا ایمیل"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        {}
        {searchQuery && (
          <button onClick={handleGoBack} className="btn go-back-btn">
            بازگشت به فرم اصلی
          </button>
        )}
      </div>

      <button onClick={handleAddContact} className="btn add-btn">
        افزودن مخاطب
      </button>
      <button
        onClick={handleDeleteSelected}
        className="btn delete-selected-btn"
      >
        حذف گروهی
      </button>
      <button onClick={handleUndo} className="btn undo-btn">
        بازگشت به قبل
      </button>

      {filteredContacts.length === 0 ? (
        <p>مخاطبی برای نمایش یافت نشد</p>
      ) : (
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <div>
                <input
                  type="checkbox"
                  className="chekboxcls"
                  checked={contact.selected || false}
                  onChange={() => handleSelectContact(contact.id)}
                />
                <span>
                  {contact.firstName} {contact.lastName}
                </span>
                <br />
                <small>{contact.email}</small>
                <br />
                <small>{contact.phone}</small>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(contact)}
                  className="btn edit-btn"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => handleShowDeleteModal(contact.id)}
                  className="btn delete-btn"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            {modalType === "delete" && (
              <div>
                <h2>آیا از حذف این مخاطب مطمئن هستید؟</h2>
                <button
                  onClick={() => handleDelete(contactToDelete)}
                  className="btn confirm-btn"
                >
                  تایید
                </button>
                <button
                  onClick={() => setIsModalVisible(false)}
                  className="btn cancel-btn"
                >
                  لغو
                </button>
              </div>
            )}

            {modalType === "edit" && (
              <div>
                <h2>ویرایش مخاطب</h2>
                <input
                  type="text"
                  placeholder="نام"
                  value={editingContact.firstName}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  value={editingContact.lastName}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      lastName: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="ایمیل"
                  value={editingContact.email}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="شماره تلفن"
                  value={editingContact.phone}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      phone: e.target.value,
                    })
                  }
                />
                <div className="form-btns">
                  <button onClick={handleSaveEdit} className="btn save-btn">
                    ذخیره
                  </button>
                  <button
                    onClick={() => setIsModalVisible(false)}
                    className="btn cancel-btn"
                  >
                    لغو
                  </button>
                </div>
              </div>
            )}

            {modalType === "add" && (
              <div>
                <h2>افزودن مخاطب جدید</h2>
                <input
                  type="text"
                  placeholder="نام"
                  value={editingContact.firstName}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      firstName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  value={editingContact.lastName}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      lastName: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="ایمیل"
                  value={editingContact.email}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      email: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="شماره تلفن"
                  value={editingContact.phone}
                  onChange={(e) =>
                    setEditingContact({
                      ...editingContact,
                      phone: e.target.value,
                    })
                  }
                />
                <div className="form-btns">
                  <button onClick={handleSaveEdit} className="btn save-btn">
                    ذخیره
                  </button>
                  <button
                    onClick={() => setIsModalVisible(false)}
                    className="btn cancel-btn"
                  >
                    لغو
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

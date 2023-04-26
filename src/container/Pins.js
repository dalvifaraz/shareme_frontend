import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CreatePin from '../components/CreatePin';
import Feed from '../components/Feed';
import PinDetail from '../components/PinDetail';
import Search from '../components/Search';
import { Routes, Route } from 'react-router-dom';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
import { client } from '../client';

const Pins = ({ userProp }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userInfo = fetchUser();
    if (!user) {
      const query = userQuery(userInfo?._id);

      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, [userProp]);

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          user={user}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;

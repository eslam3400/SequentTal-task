import React, { useEffect, useState } from 'react'
import './style.css'
import NavbarComponent from '../../components/navbar';
import axios from 'axios';
import { environment } from '../../environment';
import PostComponent from '../../components/post';

function PostsPage() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filter, setFilter] = useState('');
  const [user, setUser] = useState({ name: '', picture: '' });

  const onPerPageChange = (e) => {
    setPerPage(e.target.value);
    setPage(1);
  }

  useEffect(() => {
    axios.get(`${environment.backendV1}/posts?page=${page}&per_page=${perPage}&filter=${filter}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        setPosts(response.data.data);
        setLoading(false);
      })
  }, [page, perPage, filter])

  useEffect(() => {
    axios.get(`${environment.backendV1}/auth/whoami`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data.data.user)
      setUser(response.data.data.user);
    })
  }, [])

  return (
    <>
      {
        loading ? <div>Loading...</div> :
          <>
            <NavbarComponent user={user} />
            <main>
              <div className='search-bar'>
                <input type="text" value={filter} onChange={e => setFilter(e.target.value)} />
                <button onClick={() => setPage(1)}>Search</button>
              </div>
              <div>
                {posts.map(x => <PostComponent key={x.id} post={x} />)}
              </div>
              <div className='pagination'>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(page + 1)} disabled={posts.length < perPage}>Next</button>
                <select onChange={onPerPageChange}>
                  <option selected={perPage === 10} value={10}>10</option>
                  <option selected={perPage === 25} value={25}>25</option>
                  <option selected={perPage === 50} value={50}>50</option>
                </select>
              </div>
            </main>
          </>
      }
    </>
  )
}

export default PostsPage
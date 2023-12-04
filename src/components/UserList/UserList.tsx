import React, {useEffect, useState} from 'react'
import styles from './UserList.module.scss'
import api from '../../services/api'

interface UserData {
    id: string;
    name: string;
    avatarUrl: string;
}
const UserList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [users, setUsers] = useState<UserData[]>([])
    const [originalUsers, setOriginalUsers] = useState<UserData[]>([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await api.getUsers(searchTerm || '');
                if (isMounted) {
                    setOriginalUsers(response || []);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData()

        return () => {
            isMounted = false;
        };
    }, [searchTerm])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const filterUsers = (user: UserData) => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase())
    }

    const filteredUsers = originalUsers.filter(filterUsers);

    return (
        <div className={styles.userList}>
            <input
            type='text'
            value={searchTerm}
            onChange={handleSearch}
            placeholder='Enter name'
            />
            {(users.filter(filterUsers).length === 0) && (
                <p>No users found</p>
            )}

            {users.length > 0 && (
                    <ul>
                {filteredUsers.map(({avatarUrl, id, name}) => (
                    <li key={id}>
                        <img src={avatarUrl} alt={'Avatar'} />
                        <span>{name}</span>
                    </li>
                ))}
            </ul>
            )}
        </div>
    );
};

export default UserList

const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylists(playlistId) {
        let query = {
            text: ` SELECT 
                        playlists.*, 
                        songs.id as "songs id", 
                        songs.title as "songs title",
                        songs.performer as "songs performer"
                    FROM playlists_songs
                    INNER JOIN playlists ON playlists_songs."playlistId" = playlists.id AND playlists_songs."playlistId" = $1
                    INNER JOIN songs ON playlists_songs."songId" = songs.id
                    INNER JOIN users ON users.id = owner
                    `,
            values: [playlistId],
        };

        let result = await this._pool.query(query);

        return {
            id: result.rows[0].id,
            name: result.rows[0].name,
            songs: result.rows.map((song) => ({
                id: song['songs id'],
                title: song['songs title'],
                performer: song['songs performer'],
            })),
        };
    }
}

module.exports = PlaylistsService;
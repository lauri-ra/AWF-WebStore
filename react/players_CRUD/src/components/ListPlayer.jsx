/**
 * Copy paste your code from the ListPlayer.jsx file here from the previous exercise
 *
 * @format
 */

export const ListPlayer = ({ name, id, onClick }) => {
	return (
		<li id={`player-${id}`}>
			<a href='/#' onClick={() => onClick(id)}>
				{name}
			</a>
		</li>
	);
};

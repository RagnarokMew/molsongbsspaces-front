// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../index.css';

function FindMyMate() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedDate, setSelectedDate] = useState('');
	const [colleagues, setColleagues] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(false);

	const API_BASE = window.location.hostname.includes('localhost')
		? 'https://molsongbsspaces.onrender.com'
		: 'http://localhost:3000';

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);


	useEffect(() => {
		const fetchColleagues = async () => {
			try {
				const usersResponse = await fetch(`https://molsongbsspaces.onrender.com/api/user/all`, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
					},
				});
				const { data: users } = await usersResponse.json();

				const colleaguesWithPositions = await Promise.all(
					users.map(async (user) => {
						const positionResponse = await fetch(`https://molsongbsspaces.onrender.com/api/user/positions`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`,
							},
							body: JSON.stringify({ userId: user._id }),
						});

						const { data: positions } = await positionResponse.json();

						// Filter positions for active bookings
						const activeBooking = positions.flatMap(position => {
							const locationId = position.locationId;

							// Filter bookings by status and time, and then map to include locationId
							return position.bookings
								.filter(booking => {
									// Check status
									if (booking.status !== 'accepted') {
										return false;
									}

									// Check time range
									const startTime = new Date(booking.start).getTime();
									const endTime = new Date(booking.end).getTime();
									const currentTime = new Date().getTime();

									// Condition: start time <= current time <= end time
									return startTime <= currentTime && currentTime <= endTime;
								})
								.map(booking => ({
									// Keep all original booking fields and add locationId
									...booking,
									locationId: locationId
								}));
						})[0];

						return {
							id: user._id,
							name: user.name,
							email: user.email,
							location: activeBooking?.locationId || 'Not in office',
							status: activeBooking ? 'in-office' : 'offline',
							avatar: user.image,
						};
					})
				);

				setColleagues(colleaguesWithPositions);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching colleagues:', error);
				setLoading(false);
			}
		};

		fetchColleagues();
	}, [API_BASE]);

	const getStatusColor = (status) => {
		switch (status) {
			case 'in-office':
				return '#10b981';
			case 'remote':
				return '#f59e0b';
			case 'offline':
				return '#6b7280';
			default:
				return '#6b7280';
		}
	};

	const getStatusLabel = (status) => {
		switch (status) {
			case 'in-office':
				return 'In Office';
			case 'remote':
				return 'Remote';
			case 'offline':
				return 'Offline';
			default:
				return 'Unknown';
		}
	};

	const filteredColleagues = colleagues.filter(colleague =>
		colleague.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div style={{
			minHeight: '100vh',
			background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 45%, #dbeafe 100%)',
			padding: isMobile ? '16px 12px 20px' : '20px 16px 24px',
			position: 'relative',
			overflowX: 'hidden'
		}}>				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					opacity: 0.08,
					backgroundImage: `
						radial-gradient(circle at 12% 22%, rgba(0,103,172,0.35) 0%, transparent 22%),
						radial-gradient(circle at 88% 78%, rgba(246,221,88,0.35) 0%, transparent 22%),
						radial-gradient(circle at 50% 50%, rgba(2,132,199,0.25) 0%, transparent 28%)
					`,
					animation: 'gradientShift 20s ease infinite',
					pointerEvents: 'none'
				}} />

				<div style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage:
						'linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px)',
					backgroundSize: '48px 48px',
					opacity: 0.35,
					pointerEvents: 'none'
				}} />

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					style={{ maxWidth: '1320px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}
				>
				<div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '18px', flexWrap: 'wrap', marginBottom: isMobile ? '16px' : 24 }}>
					<motion.div
						animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
						transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
						style={{
							background: 'linear-gradient(135deg, #0067AC, #1d4ed8)',
							borderRadius: '14px',
							padding: isMobile ? '10px' : '14px',
							boxShadow: '0 10px 25px rgba(30, 64, 175, 0.25)'
						}}
					>
						{/* Simple users/group SVG */}
						<svg width={isMobile ? '24' : '30'} height={isMobile ? '24' : '30'} viewBox="0 0 24 24" fill="none">
							<path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3z" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M2 19c0-2.761 3.134-5 7-5s7 2.239 7 5" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M17 19c0-1.657 1.567-3 3.5-3S24 17.343 24 19" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</motion.div>
					<div>
						<h1 style={{
							fontSize: isMobile ? 'clamp(20px, 6vw, 34px)' : '34px',
							fontWeight: '800',
							background: 'linear-gradient(135deg, #0f172a, #1d4ed8)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							letterSpacing: '-0.4px',
							margin: 0
						}}>
							Find My Mate
						</h1>
						<p style={{ color: '#475569', margin: '6px 0 0 0', fontSize: isMobile ? '13px' : '16px', fontWeight: 500 }}>
							Locate your colleagues and see who's in the office today
						</p>
					</div>
				</div>

			{/* Search and Filters */}
			<div style={{
				background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.96), rgba(255, 255, 255, 0.98))',
				border: '1px solid rgba(148, 163, 184, 0.25)',
				borderRadius: '18px',
				padding: isMobile ? '16px 14px' : '20px',
				marginBottom: isMobile ? '16px' : '24px',
				boxShadow: '0 14px 32px rgba(15, 23, 42, 0.06)'
			}}>
				<div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))', gap: isMobile ? '12px' : '16px' }}>
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontSize: isMobile ? '13px' : '14px' }}>
							Search by name or department
						</label>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search colleagues..."
							style={{
								width: '100%',
								padding: isMobile ? '10px 12px' : '0.75rem 1rem',
								borderRadius: '0.5rem',
								border: '2px solid #e5e7eb',
								outline: 'none',
								transition: 'border-color 0.3s',
								fontSize: isMobile ? '13px' : '14px',
								boxSizing: 'border-box'
							}}
							onFocus={(e) => e.target.style.borderColor = '#0067AC'}
							onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontSize: isMobile ? '13px' : '14px' }}>
							Select Date
						</label>
						<input
							type="date"
							value={selectedDate}
							onChange={(e) => setSelectedDate(e.target.value)}
							style={{
								width: '100%',
								padding: isMobile ? '10px 12px' : '0.75rem 1rem',
								borderRadius: '0.5rem',
								border: '2px solid #e5e7eb',
								outline: 'none',
								transition: 'border-color 0.3s',
								fontSize: isMobile ? '13px' : '14px',
								boxSizing: 'border-box'
							}}
							onFocus={(e) => e.target.style.borderColor = '#0067AC'}
							onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
						/>
					</div>
				</div>
			</div>

			{/* Stats */}
			<div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: isMobile ? '12px' : '18px', marginBottom: isMobile ? '16px' : '24px' }}>
				<div style={{
					background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
					border: '1px solid rgba(148, 163, 184, 0.25)',
					borderRadius: '16px',
					padding: isMobile ? '14px 16px' : 'clamp(16px, 2vw, 20px) clamp(20px, 4vw, 28px)',
					textAlign: 'center',
					boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
						<div style={{ width: 12, height: 12, borderRadius: 6, background: '#10b981' }} />
						<div>
							<p style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#0f172a' }}>
								{colleagues.filter(c => c.status === 'in-office').length}
							</p>
							<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748b' }}>In Office Today</p>
						</div>
					</div>
				</div>

				<div style={{
					background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
					border: '1px solid rgba(148, 163, 184, 0.25)',
					borderRadius: '16px',
					padding: isMobile ? '14px 16px' : 'clamp(16px, 2vw, 20px) clamp(20px, 4vw, 28px)',
					textAlign: 'center',
					boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
						<div style={{ width: 12, height: 12, borderRadius: 6, background: '#f59e0b' }} />
						<div>
							<p style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#0f172a' }}>
								{colleagues.filter(c => c.status === 'remote').length}
							</p>
							<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748b' }}>Working Remote</p>
						</div>
					</div>
				</div>

				<div style={{
					background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
					border: '1px solid rgba(148, 163, 184, 0.25)',
					borderRadius: '16px',
					padding: isMobile ? '14px 16px' : 'clamp(16px, 2vw, 20px) clamp(20px, 4vw, 28px)',
					textAlign: 'center',
					boxShadow: '0 12px 24px rgba(15, 23, 42, 0.08)'
				}}>
					<div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
						<div style={{ width: 12, height: 12, borderRadius: 6, background: '#6b7280' }} />
						<div>
							<p style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#0f172a' }}>
								{colleagues.filter(c => c.status === 'offline').length}
							</p>
							<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748b' }}>Offline</p>
						</div>
					</div>
				</div>
			</div>

			{/* Colleagues Grid */}
			{loading ? (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">Loading colleagues...</p>
				</div>
			) : (
				<div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: isMobile ? '12px' : '16px' }}>
					{filteredColleagues.map((colleague, index) => (
						<motion.div
							key={colleague.id}
							initial={{ opacity: 0, scale: 0.96 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.32, delay: index * 0.06 }}
							whileHover={{ translateY: -4 }}
							style={{
								background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.96), rgba(255, 255, 255, 0.98))',
								border: '1px solid rgba(148, 163, 184, 0.25)',
								borderRadius: '18px',
								padding: isMobile ? '16px' : '20px',
								boxShadow: '0 14px 32px rgba(15, 23, 42, 0.06)',
								cursor: 'pointer'
							}}
						>
							<div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? '12px' : '16px' }}>
								<img style={{
									width: isMobile ? 50 : 60,
									height: isMobile ? 50 : 60,
									borderRadius: '50%',
									background: 'linear-gradient(135deg, #0067AC, #002147)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: 'white',
									fontSize: '1.25rem',
									fontWeight: 'bold',
									flexShrink: 0,
								}} src={colleague.avatar || "https://molsongbsspaces.onrender.com/images/av1.png"} />

								<div style={{ flex: 1, minWidth: 0 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 6 }}>
										<h3 style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
											{colleague.name}
										</h3>
										<div style={{ width: 8, height: 8, borderRadius: 999, backgroundColor: getStatusColor(colleague.status), flexShrink: 0 }} />
									</div>

									<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748b', margin: '0 0 6px 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>
										{colleague.email}
									</p>

									<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#0067AC', fontWeight: 600, margin: '0 0 10px 0' }}>
										{colleague.department}
									</p>

									<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
										<svg style={{ width: 16, height: 16, color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
										<p style={{ fontSize: isMobile ? '12px' : '13px', color: '#64748b', margin: 0 }}>{colleague.location}</p>
									</div>

									<span style={{ display: 'inline-block', padding: isMobile ? '4px 10px' : '0.25rem 0.75rem', borderRadius: 9999, fontSize: isMobile ? '11px' : '0.75rem', fontWeight: 600, backgroundColor: `${getStatusColor(colleague.status)}20`, color: getStatusColor(colleague.status) }}>
										{getStatusLabel(colleague.status)}
									</span>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}

			{filteredColleagues.length === 0 && !loading && (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">No colleagues found</p>
				</div>
			)}
		</motion.div>
	</div>
	);
}

export default FindMyMate;

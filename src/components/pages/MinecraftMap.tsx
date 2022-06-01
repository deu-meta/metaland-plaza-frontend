import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { FormEvent, useEffect, useRef, useState } from 'react';

import { useSpace, useSpaceAdd, useSpaceEdit } from '../../actions/space';
import { MtlSlideCard } from '../basics/MtlSlideCard';
import { MtlSpacer } from '../basics/MtlSpacer';
import { StaffOnly } from '../roles/staff';

export { MinecraftMap };

const topPaddingHeight = 120;
const MAP_URL = process.env.REACT_APP_MAP_URL || 'http://localhost:8003';

type IMarker = {
	className?: string;
	iconSize?: [number, number];
	iconUrl: string;
	label: string;
};

type MarkerClickEvent = {
	type: 'markerclick';
	marker: IMarker;
};

type MinecraftMapEvent = MarkerClickEvent | { type: undefined };

const MinecraftMap: React.FC = () => {
	const [marker, setMarker] = useState<IMarker | null>(null);
	const [showDescription, setShowDescription] = useState(false);
	const [edit, setEdit] = useState(false);
	const { data: space, isLoading, isError, refetch } = useSpace(marker?.label || null);

	const thumbnailRef = useRef<HTMLInputElement>(null);

	const spaceAdd = useSpaceAdd({
		onSuccess: () => {
			refetch();
		},
	});
	const spaceEdit = useSpaceEdit({
		onSuccess: () => {
			refetch();
		},
		onError: (error, variables) => {
			spaceAdd.mutate(variables as FormData);
		},
	});

	const onMessage = (e: MessageEvent) => {
		const event: MinecraftMapEvent = JSON.parse(e.data);

		if (event.type === 'markerclick') {
			setMarker(event.marker);
			setShowDescription(true);
		}
	};

	useEffect(() => {
		window.addEventListener('message', onMessage);

		return () => window.removeEventListener('message', onMessage);
	}, []);

	const onEdit = (event: FormEvent) => {
		event.preventDefault();
		if (!((thumbnailRef.current?.files?.length ?? 0) >= 1)) {
			thumbnailRef.current?.setAttribute('disabled', 'disabled');
		}
		const formData = new FormData(event.target as HTMLFormElement);

		spaceEdit.mutate(formData);
		thumbnailRef.current?.removeAttribute('disabled');
		setEdit(false);
	};

	return (
		<>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: -10,
					backgroundColor: 'black',
					overflow: 'hidden',
				}}>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						width: '100%',
						height: topPaddingHeight,
						backgroundColor: 'black',
						zIndex: 1000,
						boxShadow: '0 0 20px 20px black',
					}}
				/>
				<Box
					sx={{
						position: 'absolute',
						top: showDescription ? -80 : topPaddingHeight,
						bottom: 0,
						left: 0,
						right: 0,
						transition: 'top 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
					}}>
					<iframe
						src={MAP_URL}
						style={{
							flex: 1,
							border: 'none',
							backgroundColor: 'black',
							width: '100%',
							height: '100%',
						}}
						onClick={() => console.log('click')}></iframe>
				</Box>

				<MtlSlideCard
					image={space?.thumbnail}
					title={marker?.label ?? ''}
					open={showDescription}
					onClose={() => setShowDescription(false)}>
					<Typography variant="subtitle1">
						{isLoading
							? '불러오는 중 ...'
							: isError
							? '정보가 등록되지 않았습니다.'
							: space !== undefined
							? space.short_introduce
							: ''}
					</Typography>

					{space !== undefined && (
						<Typography variant="body2" color="textSecondary">
							{space.long_introduce}
						</Typography>
					)}

					<StaffOnly>
						<MtlSpacer vertical={20} />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
							}}>
							<Button onClick={() => setEdit(true)}>편집</Button>
						</Box>
					</StaffOnly>
				</MtlSlideCard>
			</Box>

			{marker !== null && (
				<Dialog open={edit}>
					<form onSubmit={onEdit}>
						<DialogTitle>{marker.label}</DialogTitle>
						<DialogContent>
							<input type="hidden" name="name" value={marker.label}></input>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									marginTop: 2,
									marginBottom: 1,
								}}>
								<Typography variant="subtitle1">썸네일</Typography>
								<MtlSpacer horizontal={20} />
								<input type="file" name="thumbnail" ref={thumbnailRef}></input>
							</Box>

							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									marginTop: 2,
									marginBottom: 1,
								}}>
								<Typography variant="subtitle1">분류</Typography>
								<MtlSpacer horizontal={20} />
								<Select
									variant="standard"
									name="type"
									key={`${space?.name ?? marker.label}_type`}
									defaultValue="건물"
									label="분류">
									<MenuItem value="건물">건물</MenuItem>
									<MenuItem value="학과">학과</MenuItem>
									<MenuItem value="동아리">동아리</MenuItem>
								</Select>
							</Box>

							<TextField
								name="short_introduce"
								key={`${space?.name ?? marker.label}_short_introduce`}
								fullWidth
								multiline
								rows={2}
								label="짧은 소개"
								helperText="한~두 문장 내로 특징을 잘 설명할 수 있는 좋은 설명을 입력해주세요."
								margin="normal"
								defaultValue={space?.short_introduce || ''}
							/>
							<TextField
								name="long_introduce"
								key={`${space?.name ?? marker.label}_long_introduce`}
								fullWidth
								multiline
								rows={6}
								label="자세한 소개"
								helperText="건물에 어떤 것들이 있고 어떤 것을 할 수 있는지 등의 자세한 정보를 적어주세요."
								margin="normal"
								defaultValue={space?.long_introduce || ''}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={() => setEdit(false)}>취소</Button>
							<Button type="submit">저장</Button>
						</DialogActions>
					</form>
				</Dialog>
			)}
		</>
	);
};

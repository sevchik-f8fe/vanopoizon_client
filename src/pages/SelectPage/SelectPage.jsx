import { Box, Typography, TextField, Skeleton } from "@mui/material";
import { useEffect, useCallback } from "react";
import { nanoid } from "nanoid";
import axios from "axios";

import { useDeliveryData } from "../DeliveryDataPage/store";
import { useSelectPage } from "./store";
import _ from "lodash";
import EndMessage from "../../components/EndMessage";

const SelectPage = () => {
    const { setFieldValue } = useDeliveryData();

    let tg = window.Telegram.WebApp;
    const { searchValue, data, currentPage, addData, isLoading, hasMore, setData, setIsLoading, setHasMore, setCurrentPage, setSearchValue } = useSelectPage();

    useEffect(() => {
        tg.BackButton.show();
        tg.MainButton.hide();
    }, []);

    useEffect(() => {
        const getCityList = async () => {
            setIsLoading(true);
            setHasMore(true);

            await axios.post('https://vanopoizonserver.ru/vanopoizon/api/getCities', { page: currentPage },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(response => {
                    if (response.data.cities.length == 0) {
                        setHasMore(false);
                    } else {
                        setData(response.data.cities)
                    }
                })
                .catch(error => console.error('Ошибка: ', error))
                .finally(() => setIsLoading(false))
        };

        getCityList();
    }, [currentPage])

    useEffect(() => {
        const debouncedCheckAndFetchMore = _.debounce(async () => {
            const filteredData = filterListHandle(data, searchValue);

            if (filteredData.length === 0 && hasMore && !isLoading) {
                setCurrentPage(currentPage + 1);
            }
        }, 250);

        if (data.length > 0) debouncedCheckAndFetchMore();
    }, [searchValue, isLoading, hasMore]);

    const onSelectHandle = (label, code, coords) => {
        setFieldValue('pvz', { smallAddress: '', fullAddress: '' })
        setFieldValue('city', { name: label, code: code, coords: coords })
        window.history.back();
    }

    const filterListHandle = (array, searchTerm) => {
        const searchTerms = searchTerm.toLowerCase().split(' ');

        return array.filter(item => {
            const itemWords = `${item?.region}, ${item?.city}`.toLowerCase().split(', ');
            return searchTerms.every(term => itemWords.some(itemWord => itemWord.includes(term)));
        });
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5em',
            }}
        >
            <Box
                sx={{
                    top: '.0000001px',
                    backgroundColor: '#202029',
                    mx: '.5em',
                    position: 'sticky',
                    zIndex: 102120012,
                }}
            >
                <TextField
                    label='Город'
                    value={searchValue}
                    variant="outlined"
                    autoFocus
                    sx={{
                        fontSize: '1em',
                        color: '#fff',
                        minWidth: '100%'
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </Box>
            {!isLoading && filterListHandle(data, searchValue).length > 0 ? (
                <>
                    {filterListHandle(data, searchValue)
                        .filter((elem, id) => id < 50)
                        .map((elem) => <SelectElement key={nanoid()} coords={[elem?.latitude, elem?.longitude]} code={elem?.code} subText={`${elem?.region},`} text={elem?.city} onSelect={onSelectHandle} />)}

                    {!hasMore && (
                        <Box
                            sx={{
                                p: '.8em .5em',
                                m: '0 .5em',
                                borderRadius: '.5em',
                                backgroundColor: '#2E2E3A80',
                            }}
                        >
                            <EndMessage title="Населенный пункт не найлен" />
                        </Box>
                    )}
                </>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.2em'
                    }}
                >
                    {
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((elem) => <Skeleton sx={{
                            p: '.8em .5em',
                            mx: '.5em',
                            borderRadius: '.5em',
                            backgroundColor: '#2E2E3A80',
                        }}
                            animation="wave"
                            key={nanoid()}
                            height='3em'
                            variant="rectangular"
                            width='100%'
                        />)
                    }
                </Box>
            )}
        </Box>
    );
}

const SelectElement = ({ text, onSelect, code, subText, coords }) => {
    return (
        <Box
            onClick={() => onSelect(text, code, coords)}
            sx={{
                cursor: 'pointer',
                p: '.8em .5em',
                m: '0 .5em',
                borderRadius: '.5em',
                backgroundColor: '#2E2E3A80',
            }}
        >
            <Typography variant="caption">{subText} {text}</Typography>
        </Box>
    );
}

export default SelectPage;
const All = () => {
  //Continue Data
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const appContext = useContext(AppContext);
  const {activeTrainingScreen} = appContext;
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  // const [canAction, setCanAction] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  // Tüm eğitimleri çeker
  async function getAllContinueTraining() {
    setLoading(true);
    setItems([]);
    const result = await TrainingService.getAll({
      maxResultCount: 10,
    });
    setItems([...result.items]);
    setTotalCount(result.totalCount);
    setRefreshing(false);
    setLoading(false);
  }

  async function bootstrapAPI() {
    await getAllContinueTraining();
  }

  useEffect(() => {
    if (activeTrainingScreen === 'third') {
      bootstrapAPI();
    }
  }, [activeTrainingScreen]);

  const _handleLoadMore = async () => {
    if (items.length < totalCount) {
      setIsLoadingMore(true);
      let result = await TrainingService.getAll({
        isActive: true,
        skipCount: page * 10,
        maxResultCount: (page + 1) * 10,
      });
      setItems(oldData => [...oldData, ...result.items]);
      setPage(oldPage => oldPage + 1);
      setTotalCount(result.totalCount);
      setIsLoadingMore(false);
    }
  };

  const _handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await getAllContinueTraining();
  };

  const EmptyVideoComponent = () => {
    if (refreshing) {
      return <View />;
    }

    return (
      <View style={styles.emptySurveyContainer}>
        <Text style={styles.emptySurveyTitle}>
          Herhangi bir eğitim bulunamadı.
        </Text>
      </View>
    );
  };

  const _renderFooter = () => (
    <View style={styles.isLoadingMore}>{isLoadingMore && <Loader />}</View>
  );

  if (loading) {
    return (
      <View style={styles.flex}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={items}
        renderItem={({item}) => <TrainingItem key={item.id} item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={({item}, index) => index}
        ListFooterComponent={() => _renderFooter()}
        ListEmptyComponent={<EmptyVideoComponent />}
        onRefresh={_handleRefresh}
        refreshing={refreshing}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum) {
            _handleLoadMore();
            setOnEndReachedCalledDuringMomentum(true);
          }
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
      />
    </View>
  );
};
export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
    height: HEIGHT * 0.65,
  },
  flatlistContainer: {
    flex: 1,
  },
  isLoadingMore: {
    marginTop: 10,
  },
  onGoingArea: {
    flex: 1,
    marginTop: 22,
  },
  contentTitle: {
    color: Colors.mainTextColor,
    paddingLeft: 15,
    height: 24,
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
  },
  emptyText: {
    fontFamily: 'Nunito-Regular',
    textAlign: 'left',
    fontSize: 17,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.mainTextColor,
    paddingLeft: 15,
    marginTop: 10,
  },
  contentContainerStyle: {
    backgroundColor: Colors.whiteDark,
    minHeight: 400,
    paddingBottom: 60,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  emptySurveyContainer: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySurveyTitle: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.mainTextColor,
    textAlign: 'center',
  },
});

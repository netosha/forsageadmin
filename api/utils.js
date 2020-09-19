export function currentStageName(stage){
    switch (stage) {
        case -1:
            return 'Ожидает доступа к обучению'
        case 0:
            return 'Изучает первое видео'
        case 1:
            return 'Изучает второе видео'
        case 2:
            return 'Просмотрел вступительные видео'
        case 3:
            return 'Ожидает подтверждения'
        case 4:
            return 'Изучает обучающие модули'
        case 5:
            return 'Изучает бизнес-предложение'
        case 6:
            return 'Заявка на активацию кабинета'
    }
}
export default class HomeController {
  constructor($filter,BaseModalService,BaseToastService) {
    this.name = 'World';
    this.BaseModalService = BaseModalService;
    this.BaseToastService = BaseToastService;
    this.user = {
        status: 2
      }; 

    this.statuses = [
      {value: 1, text: 'status1'},
      {value: 2, text: 'status2'},
      {value: 3, text: 'status3'},
      {value: 4, text: 'status4'}
    ]; 
    this.$filter = $filter;
  }

  changeName() {
    console.log(this.BaseModalService);
        this.BaseModalService.confirm({
          modalTitle:'Double check...',
          modalBody:'Please confirm that you have finished all questions',

        }).then(function(result){
          console.log(result);
        });
  }

  randomName() {
    // this.BaseModalService.errorAlert('"hello there!"');
    this.BaseToastService.error('danger');
  }

  showStatus() {
    
  }


}

HomeController.$inject = ['$filter','BaseModalService','BaseToastService'];

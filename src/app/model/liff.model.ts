export interface Profile {
    userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
    }

  export function fInclude(arr: any[], value: any): boolean { 
        for(let i=0; i<arr.length; ++i) { 
          if(arr[i] == value) { 
            return true; 
          } 
        } return false; 
      }
      
    export function  sortData(arr: any[], template: number) {
        if(template == 1) {
            const arr2: any[] = [];
          for(let i=0; i<arr.length; ++i) { let obj = arr[i]; if(obj.name == 'ลาพักร้อน') { arr2.push(obj); } }
          for(let i=0; i<arr.length; ++i) { let obj = arr[i]; if(obj.name == 'ลากิจ') { arr2.push(obj); } }
          for(let i=0; i<arr.length; ++i) { let obj = arr[i]; if(obj.name == 'ลาป่วย') { arr2.push(obj); } }
          for(let i=0; i<arr.length; ++i) { let obj = arr[i]; if(!fInclude(['ลาพักร้อน', 'ลากิจ', 'ลาป่วย'], obj.name)) { arr2.push(obj); } }
          return arr2;
        } else { return null }
    }

    export function getObject(arr: any[], value: string, template: string) {
        if (template == 'id') {
            for(let i=0; i<arr.length; ++i) { let obj = arr[i]; if(obj.id == value) { return obj } }
        }
        return null;
    }
"use client";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";

export function AlertDialogDemo() {
  return (
    <AlertDialog open={true}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
          <AlertDialogDescription>
            Hết thời gian giữ ghế. Hãy thực hiện lại đơn hàng của bạn trong 5
            phút.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* <AlertDialogFooter>
          <AlertDialogAction onClick={e=>console.log(e)}>Đặt vé lại</AlertDialogAction>
        </AlertDialogFooter> */}
          <Button onClick={() => window.location.reload()}>Đặt vé lại</Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}

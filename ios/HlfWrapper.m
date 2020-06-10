#import "HlfWrapper.h"
#import "Hlfsdk.h"

@implementation HlfWrapper

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(hello,
                 resolver: (RCTPromiseResolveBlock)resolve
                 rejecter: (RCTPromiseRejectBlock)reject)
{
 @try{
   NSString *result = HlfsdkHello();
   resolve(result);
 }
 @catch(NSException *exception){
   reject(@"E_GET_ERROR", exception.reason, nil);
 }
}

@end

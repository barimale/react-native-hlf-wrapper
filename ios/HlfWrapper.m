#import "HlfWrapper.h"
#import <hlfsdk/hlfsdk.h>

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
   reject(@"E_GET_ERROR", @"Get operation failed", @exception.reason);
 }
}

@end

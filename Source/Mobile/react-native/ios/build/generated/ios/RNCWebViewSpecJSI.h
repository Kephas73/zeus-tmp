/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateModuleH.js
 */

#pragma once

#include <ReactCommon/TurboModule.h>
#include <react/bridging/Bridging.h>

namespace facebook::react {


  class JSI_EXPORT NativeRNCWebViewModuleCxxSpecJSI : public TurboModule {
protected:
  NativeRNCWebViewModuleCxxSpecJSI(std::shared_ptr<CallInvoker> jsInvoker);

public:
  virtual jsi::Value isFileUploadSupported(jsi::Runtime &rt) = 0;
  virtual void shouldStartLoadWithLockIdentifier(jsi::Runtime &rt, bool shouldStart, double lockIdentifier) = 0;

};

template <typename T>
class JSI_EXPORT NativeRNCWebViewModuleCxxSpec : public TurboModule {
public:
  jsi::Value get(jsi::Runtime &rt, const jsi::PropNameID &propName) override {
    return delegate_.get(rt, propName);
  }

  static constexpr std::string_view kModuleName = "RNCWebViewModule";

protected:
  NativeRNCWebViewModuleCxxSpec(std::shared_ptr<CallInvoker> jsInvoker)
    : TurboModule(std::string{NativeRNCWebViewModuleCxxSpec::kModuleName}, jsInvoker),
      delegate_(reinterpret_cast<T*>(this), jsInvoker) {}

private:
  class Delegate : public NativeRNCWebViewModuleCxxSpecJSI {
  public:
    Delegate(T *instance, std::shared_ptr<CallInvoker> jsInvoker) :
      NativeRNCWebViewModuleCxxSpecJSI(std::move(jsInvoker)), instance_(instance) {}

    jsi::Value isFileUploadSupported(jsi::Runtime &rt) override {
      static_assert(
          bridging::getParameterCount(&T::isFileUploadSupported) == 1,
          "Expected isFileUploadSupported(...) to have 1 parameters");

      return bridging::callFromJs<jsi::Value>(
          rt, &T::isFileUploadSupported, jsInvoker_, instance_);
    }
    void shouldStartLoadWithLockIdentifier(jsi::Runtime &rt, bool shouldStart, double lockIdentifier) override {
      static_assert(
          bridging::getParameterCount(&T::shouldStartLoadWithLockIdentifier) == 3,
          "Expected shouldStartLoadWithLockIdentifier(...) to have 3 parameters");

      return bridging::callFromJs<void>(
          rt, &T::shouldStartLoadWithLockIdentifier, jsInvoker_, instance_, std::move(shouldStart), std::move(lockIdentifier));
    }

  private:
    T *instance_;
  };

  Delegate delegate_;
};

} // namespace facebook::react
